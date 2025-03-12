function generateFileName(orignal_name) {
    return (new Date().getTime()) + "-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + orignal_name;

}
module.exports = { generateFileName };