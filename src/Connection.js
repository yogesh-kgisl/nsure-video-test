import RTCMultiConnection from 'rtcmulticonnection'

const connection = new RTCMultiConnection();
export default connection;

export const mediaConstraints =  {
    audio: true,
    video: {
        mandatory: {
            minWidth: 300,
            maxheight: 300,
           
        }
    }
};