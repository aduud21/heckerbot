import {IncomingMessage, ServerResponse} from "http"

type ContentSecurityPolicyDirectiveValueFunction = (req: IncomingMessage, res: ServerResponse) => string
type ContentSecurityPolicyDirectiveValue = string | ContentSecurityPolicyDirectiveValueFunction
interface ContentSecurityPolicyOptions {
	useDefaults?: boolean
	directives?: Record<string, null | Iterable<ContentSecurityPolicyDirectiveValue> | typeof dangerouslyDisableDefaultSrc>
	reportOnly?: boolean
}
interface ContentSecurityPolicy {
	(options?: Readonly<ContentSecurityPolicyOptions>): (req: IncomingMessage, res: ServerResponse, next: (err?: Error) => void) => void
	getDefaultDirectives: typeof getDefaultDirectives
	dangerouslyDisableDefaultSrc: typeof dangerouslyDisableDefaultSrc
}
declare const dangerouslyDisableDefaultSrc: unique symbol
declare const getDefaultDirectives: () => {
	[x: string]: Iterable<ContentSecurityPolicyDirectiveValue>
}
declare const contentSecurityPolicy: ContentSecurityPolicy

interface CrossOriginEmbedderPolicyOptions {
	policy?: "require-corp" | "credentialless"
}
declare function crossOriginEmbedderPolicy(options?: Readonly<CrossOriginEmbedderPolicyOptions>): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

interface CrossOriginOpenerPolicyOptions {
	policy?: "same-origin" | "same-origin-allow-popups" | "unsafe-none"
}
declare function crossOriginOpenerPolicy(options?: Readonly<CrossOriginOpenerPolicyOptions>): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

interface CrossOriginResourcePolicyOptions {
	policy?: "same-origin" | "same-site" | "cross-origin"
}
declare function crossOriginResourcePolicy(options?: Readonly<CrossOriginResourcePolicyOptions>): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

interface ExpectCtOptions {
	maxAge?: number
	enforce?: boolean
	reportUri?: string
}
declare function expectCt(options?: Readonly<ExpectCtOptions>): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

declare function originAgentCluster(): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

type ReferrerPolicyToken = "no-referrer" | "no-referrer-when-downgrade" | "same-origin" | "origin" | "strict-origin" | "origin-when-cross-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | ""
interface ReferrerPolicyOptions {
	policy?: ReferrerPolicyToken | ReferrerPolicyToken[]
}
declare function referrerPolicy(options?: Readonly<ReferrerPolicyOptions>): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

interface StrictTransportSecurityOptions {
	maxAge?: number
	includeSubDomains?: boolean
	preload?: boolean
}
declare function strictTransportSecurity(options?: Readonly<StrictTransportSecurityOptions>): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

declare function xContentTypeOptions(): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

interface XDnsPrefetchControlOptions {
	allow?: boolean
}
declare function xDnsPrefetchControl(options?: Readonly<XDnsPrefetchControlOptions>): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

declare function xDownloadOptions(): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

interface XFrameOptionsOptions {
	action?: "deny" | "sameorigin"
}
declare function xFrameOptions(options?: Readonly<XFrameOptionsOptions>): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

interface XPermittedCrossDomainPoliciesOptions {
	permittedPolicies?: "none" | "master-only" | "by-content-type" | "all"
}
declare function xPermittedCrossDomainPolicies(options?: Readonly<XPermittedCrossDomainPoliciesOptions>): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

declare function xPoweredBy(): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

declare function xXssProtection(): (_req: IncomingMessage, res: ServerResponse, next: () => void) => void

interface HelmetOptions {
	contentSecurityPolicy?: ContentSecurityPolicyOptions | boolean
	crossOriginEmbedderPolicy?: CrossOriginEmbedderPolicyOptions | boolean
	crossOriginOpenerPolicy?: CrossOriginOpenerPolicyOptions | boolean
	crossOriginResourcePolicy?: CrossOriginResourcePolicyOptions | boolean
	dnsPrefetchControl?: XDnsPrefetchControlOptions | boolean
	expectCt?: ExpectCtOptions | boolean
	frameguard?: XFrameOptionsOptions | boolean
	hidePoweredBy?: boolean
	hsts?: StrictTransportSecurityOptions | boolean
	ieNoOpen?: boolean
	noSniff?: boolean
	originAgentCluster?: boolean
	permittedCrossDomainPolicies?: XPermittedCrossDomainPoliciesOptions | boolean
	referrerPolicy?: ReferrerPolicyOptions | boolean
	xssFilter?: boolean
}
interface Helmet {
	(options?: Readonly<HelmetOptions>): (req: IncomingMessage, res: ServerResponse, next: (err?: unknown) => void) => void
	contentSecurityPolicy: typeof contentSecurityPolicy
	crossOriginEmbedderPolicy: typeof crossOriginEmbedderPolicy
	crossOriginOpenerPolicy: typeof crossOriginOpenerPolicy
	crossOriginResourcePolicy: typeof crossOriginResourcePolicy
	dnsPrefetchControl: typeof xDnsPrefetchControl
	expectCt: typeof expectCt
	frameguard: typeof xFrameOptions
	hidePoweredBy: typeof xPoweredBy
	hsts: typeof strictTransportSecurity
	ieNoOpen: typeof xDownloadOptions
	noSniff: typeof xContentTypeOptions
	originAgentCluster: typeof originAgentCluster
	permittedCrossDomainPolicies: typeof xPermittedCrossDomainPolicies
	referrerPolicy: typeof referrerPolicy
	xssFilter: typeof xXssProtection
}
declare const helmet: Helmet

export {HelmetOptions, contentSecurityPolicy, crossOriginEmbedderPolicy, crossOriginOpenerPolicy, crossOriginResourcePolicy, helmet as default, xDnsPrefetchControl as dnsPrefetchControl, expectCt, xFrameOptions as frameguard, xPoweredBy as hidePoweredBy, strictTransportSecurity as hsts, xDownloadOptions as ieNoOpen, xContentTypeOptions as noSniff, originAgentCluster, xPermittedCrossDomainPolicies as permittedCrossDomainPolicies, referrerPolicy, xXssProtection as xssFilter}
