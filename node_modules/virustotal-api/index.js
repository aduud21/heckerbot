const needle = require('needle')

// API Urls
const fileScanUrl = 'https://www.virustotal.com/vtapi/v2/file/scan'
const fileReportUrl = 'https://www.virustotal.com/vtapi/v2/file/report?apikey=<apikey>&resource=<resource>'
const fileScanUploadUrlUrl = 'https://www.virustotal.com/vtapi/v2/file/scan/upload_url?apikey=<apikey>'
const fileRescanUrl = 'https://www.virustotal.com/vtapi/v2/file/rescan'
const fileDownloadUrl = 'https://www.virustotal.com/vtapi/v2/file/download?apikey=<apikey>&hash=<hash>'
const fileBehaviourUrl = 'https://www.virustotal.com/vtapi/v2/file/behaviour?apikey=<apikey>&hash=<hash>'
const fileNetworkTrafficUrl = 'https://www.virustotal.com/vtapi/v2/file/network-traffic?apikey=<apikey>&hash=<hash>'
const fileFeedUrl = 'https://www.virustotal.com/vtapi/v2/file/feed?apikey=<apikey>&package=<package>'
const fileClustersUrl = 'https://www.virustotal.com/vtapi/v2/file/clusters?apikey=<apikey>&date=<date>'
const fileSearchUrl = 'https://www.virustotal.com/vtapi/v2/file/search?apikey=<apikey>&query=<query>'
const urlReportUrl = 'https://www.virustotal.com/vtapi/v2/url/report?apikey=<apikey>&resource=<resource>'
const urlScanUrl = 'https://www.virustotal.com/vtapi/v2/url/scan'
const urlFeedUrl = 'https://www.virustotal.com/vtapi/v2/url/feed?apikey=apikey&package=package'
const domainReportUrl = 'https://www.virustotal.com/vtapi/v2/domain/report?apikey=<apikey>&domain=<domain>'
const ipAddressReportUrl = 'https://www.virustotal.com/vtapi/v2/ip-address/report?apikey=<apikey>&ip=<ip>'
const commentsGetUrl = 'https://www.virustotal.com/vtapi/v2/comments/get?apikey=apikey&resource=resource'
const commentsPutUrl = 'https://www.virustotal.com/vtapi/v2/comments/put'

// Error Codes
const ERROR_204 = 'Request rate limit exceeded. You are making more requests than allowed.'
const ERROR_400 = 'Bad request. Your request was somehow incorrect. This can be caused by missing arguments or arguments with wrong values.'
const ERROR_403 = 'Forbidden. You don\'t have enough privileges to make the request. You may be doing a request without providing an API key or you may be making a request to a Private API without having the appropriate privileges.'

/**
 * @summary Virustotal API v2.0 wrapper
 * @see {@link https://developers.virustotal.com/v2.0/reference}
 * @class VirusTotal
 */
class VirusTotal {
  /**
   * @author Remisa Yousefvand <remisa.yousefvand@gmail.com>
   * @summary Creates an instance of VirusTotal
   * @param {String} apiKey - The api key provided by Virustotal to you
   * @param {Object} [options=null] - Connection options
   * @memberof VirusTotal
   */
  constructor (apiKey, options = null) {
    this._apiKey = apiKey
    this._options = options || {
      compressed: true, // sets 'Accept-Encoding' to 'gzip,deflate'
      follow_max: 5, // follow up to five redirects
      rejectUnauthorized: true, // verify SSL certificate
      multipart: true,
      timeout: 2 * 60 * 1000,
      user_agent: 'virustotal-api'
    }
  }

  /**
   * @readonly
   * @property
   * @returns {string} - API key
   * @memberof VirusTotal
   */
  get apiKey () {
    return this._apiKey
  }

  /**
   * @summary Retrieve file scan reports
   * @param {string} resource - Resource(s) to be retrieved
   * @param {boolean} [allinfo=false] - [PRIVATE API] - Return all info
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async fileReport (resource, allinfo = false) {
    let url = fileReportUrl
    if (allinfo) {
      url += '&allinfo=true'
    }
    const res = await needle('get', url.replace('<apikey>', this._apiKey).replace('<resource>', resource), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary Scan a file
   * @param {Buffer} fileContent - Binary content of the file
   * @param {string} [fileName='unknown'] - Provides metadata to antiviruses if specified
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  fileScan (fileContent, fileName = 'unknown') {
    if (fileContent && fileContent.byteLength < 1) {
      throw new Error('File content buffer is empty! Make sure file exists and your antivirus does not block access to it.')
    }
    const data = {
      apikey: this._apiKey,
      file: {
        // file: file,
        buffer: fileContent,
        filename: fileName,
        content_type: 'application/octet-stream'
      }
    }

    return new Promise((resolve, reject) => {
      needle.post(fileScanUrl, data, this._options, (err, res, body) => {
        if (err) {
          reject(err)
        } else {
          const resError = this._checkResponse(res)
          if (resError) {
            reject(resError)
          } else {
            resolve(body)
          }
        }
      })
    })
  }

  /**
   *@summary [RESTRICTED API] Get a URL for uploading files larger than 32MB
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async fileScanUploadUrl () {
    const res = await needle('get', fileScanUploadUrlUrl.replace('<apikey>', this._apiKey), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary Re-scan a file
   * @param {string} resource - Resource(s) to be retrieved
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  fileRescan (resource) {
    const data = {
      apikey: this._apiKey,
      resource: resource
    }
    return new Promise((resolve, reject) => {
      needle.post(fileRescanUrl, data, this._options, (err, res, body) => {
        if (err) {
          reject(err)
        } else {
          const resError = this._checkResponse(res)
          if (resError) {
            reject(resError)
          } else {
            resolve(body)
          }
        }
      })
    })
  }

  /**
   * @summary [PRIVATE API] Download a file
   * @param {string} hash - The md5/sha1/sha256 hash of the file you want to download
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async fileDownload (hash) {
    const res = await needle('get', fileDownloadUrl.replace('<apikey>', this._apiKey).replace('<hash>', hash), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary [PRIVATE API] Retrieve behaviour report
   * @param {string} hash - The md5/sha1/sha256 hash of the file whose dynamic behavioural report you want to retrieve.
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async fileBehaviour (hash) {
    const res = await needle('get', fileBehaviourUrl.replace('<apikey>', this._apiKey).replace('<hash>', hash), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary [PRIVATE API] Retrieve network traffic report
   * @param {string} hash - The md5/sha1/sha256 hash of the file whose network traffic dump you want to retrieve
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async fileNetworkTraffic (hash) {
    const res = await needle('get', fileNetworkTrafficUrl.replace('<apikey>', this._apiKey).replace('<hash>', hash), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary [PRIVATE API] Retrieve live feed of all files submitted to VirusTotal
   * @param {string} package_ - Indicates a time window to pull reports on all items received during such window. Timestamp less than 24 hours ago, UTC.
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async fileFeed (package_) {
    const res = await needle('get', fileFeedUrl.replace('<apikey>', this._apiKey).replace('<package>', package_), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary [PRIVATE API] Retrieve file clusters
   * @param {string} date - A date for which we want to access the clustering details in YYYY-MM-DD format.
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async fileClusters (date) {
    const res = await needle('get', fileClustersUrl.replace('<apikey>', this._apiKey).replace('<date>', date), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary [PRIVATE API] Search for files
   * @param {string} query - Search query
   * @param {string} [offset=-1] - The offset value returned by a previous identical query, allows you to paginate over the results.
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async fileSearch (query, offset = -1) {
    let url = fileSearchUrl
    if (offset !== -1) {
      url += `&offset=${offset}`
    }
    const res = await needle('get', url.replace('<apikey>', this._apiKey).replace('<query>', query), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary Retrieve URL scan reports
   * @param {string} scanIdOrUrl - A URL for which you want to retrieve the most recent report. You may also specify a scan_id (sha256-timestamp as returned by the URL submission API) to access a specific report.
   * @param {boolean} [allinfo=false] - Return additional information about the file
   * @param {number} [scan=0] - This is an optional parameter that when set to "1" will automatically submit the URL for analysis if no report is found for it in VirusTotal's database. In this case the result will contain a scan_id field that can be used to query the analysis report later on.
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async urlReport (scanIdOrUrl, allinfo = false, scan = 0) {
    let url = urlReportUrl
    if (allinfo) {
      url += '&allinfo=true'
    }
    if (scan !== 0) {
      url += `&scan=${scan}`
    }
    const res = await needle('get', url.replace('<apikey>', this._apiKey).replace('<resource>', scanIdOrUrl), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary Scan an URL
   * @param {string} url - The URL that should be scanned
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  urlScan (url) {
    const data = {
      apikey: this._apiKey,
      url: url
    }
    return new Promise((resolve, reject) => {
      needle.post(urlScanUrl, data, (err, res, body) => {
        if (err) {
          reject(err)
        } else {
          const resError = this._checkResponse(res)
          if (resError) {
            reject(resError)
          } else {
            resolve(body)
          }
        }
      })
    })
  }

  /**
   * @summary [PRIVATE API] Retrieve live feed of all URLs submitted to VirusTotal
   * @param {string} package_ - Indicates a time window to pull reports on all items received during such window
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async urlFeed (package_) {
    const res = await needle('get', urlFeedUrl.replace('<apikey>', this._apiKey).replace('<package>', package_), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary Retrieves a domain report
   * @param {string} domain - Domain name
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async domainReport (domain) {
    const res = await needle('get', domainReportUrl.replace('<apikey>', this._apiKey).replace('<domain>', domain), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary Retrieve an IP address report
   * @param {string} ip - IP address
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async ipAddressReport (ip) {
    if (!/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(ip)) {
      if (!/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(ip)) {
        throw Error(`Invalid IP address: ${ip}`)
      }
    }
    const res = await needle('get', ipAddressReportUrl.replace('<apikey>', this._apiKey).replace('<ip>', ip), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary Get comments for a file or URL
   * @param {string} resource - Either an md5/sha1/sha256 hash of the file or the URL itself you want to retrieve.
   * @param {string} [before=null] - A datetime token that allows you to iterate over all comments on a specific item whenever it has been commented on more than 25 times.
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  async commentsGet (resource, before = null) {
    let url = commentsGetUrl
    if (before) {
      url += `&before=${before}`
    }
    const res = await needle('get', url.replace('<apikey>', this._apiKey).replace('<resource>', resource), this._options)
    const resError = this._checkResponse(res)
    if (resError) {
      throw resError
    } else {
      return res.body
    }
  }

  /**
   * @summary Post comment for a file or URL
   * @param {string} resource - Either an md5/sha1/sha256 hash of the file you want to review or the URL itself that you want to comment on
   * @param {string} comment - The comment's text
   * @returns {Promise} - Response object
   * @memberof VirusTotal
   */
  commentsPut (resource, comment) {
    const data = {
      apikey: this._apiKey,
      resource: resource,
      comment: comment
    }
    return new Promise((resolve, reject) => {
      needle.post(commentsPutUrl, data, (err, res, body) => {
        if (err) {
          reject(err)
        } else {
          const resError = this._checkResponse(res)
          if (resError) {
            reject(resError)
          } else {
            resolve(body)
          }
        }
      })
    })
  }

  /* ======== Private Functions ======== */

  /**
   * Check response status code
   * @private
   * @param {Object} res - Response object
   * @returns {Error|null} - Returns error object in case of error
   * @memberof VirusTotal
   */
  _checkResponse (res) {
    switch (res.statusCode) {
      case 204:
        return new Error(ERROR_204)
      case 400:
        return new Error(ERROR_400)
      case 403:
        return new Error(ERROR_403)
      case 200:
        return null
      default:
        return new Error(`Unknown error: ${res}`)
    }
  }
}

module.exports = VirusTotal
