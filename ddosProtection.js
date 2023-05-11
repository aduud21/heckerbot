const geoip = require('geoip-lite');
const userRecently = new Set();
const usersMap = new Map();
let ddos = 0;
let DDOS_ATTACK = false;
setInterval(() => {
  if (!DDOS_ATTACK && ddos > 29) {
    DDOS_ATTACK = true;
    console.log('[DEFENSE SYSTEM] WARNING DDoS ATTACK DETECTED');
    setTimeout(() => {
      console.log('[DEFENSE SYSTEM] DDoS ATTACKS NOW STOPPED');
      DDOS_ATTACK = false;
    }, 300 * 1000);
    return;
  }
  ddos = 0;
}, 2 * 1000)
async function getIpAddress(req) {
  const ip = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '') || req.connection.remoteAddress
  if (ip.includes('::ffff:')) {
    return ip.split(':').reverse()[0]
  }
  return ip;
}
async function getGeoData(ipAddress) {
  if (ipAddress === '127.0.0.1' || ipAddress === '::1') {
    return null;
  }
  return geoip.lookup(ipAddress);
}
module.exports = async (request) => {
  try {
    const ipAddress = request.headers['cf-connecting-ip'] || await getIpAddress(request)
    const geo = request.headers['cf-ipcountry'] || await getGeoData(ipAddress)
    let getData = usersMap.get(`veri_${ipAddress}`) || 0
    if (getData > 11) {
      if (getData > 99) {
        return 'USER_DDOS';
      }
      if (!DDOS_ATTACK) {
        setTimeout(() => {
          usersMap.delete(`veri_${ipAddress}`);
        }, 3600 * 1000);
        usersMap.set(`veri_${ipAddress}`, getData + 999);
        return 'USER_DDOS';
      }
      usersMap.set(`veri_${ipAddress}`, getData + 999);
      return 'USER_DDOS';
    } else {
      if (getData) usersMap.set(`veri_${ipAddress}`, getData + 1)
      if (!getData || getData === 0) {
        setTimeout(() => {
          usersMap.delete(`veri_${ipAddress}`)
        }, 120 * 1000);
        usersMap.set(`veri_${ipAddress}`, 1)
      }
    }
    return false;
  } catch (error) {
    console.error(error)
  }
}