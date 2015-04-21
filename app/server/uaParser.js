import UaParser from 'ua-parser-js';

/**
 * user agent check server side
 * takes in the request param
 * @param  {object} req 
 * @return {string} device type
 */
export default function getDeviceType( req ) {
	let uaParser  = new UaParser();
	
   	if( req ) {
   		uaParser = uaParser.setUA(req.headers['user-agent']);
   	}

    if( uaParser.getResult().device.type === undefined || 'browser' ) {
        return 'browser';
    }
    return 'mobile';
}
