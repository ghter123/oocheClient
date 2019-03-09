export default {
    isMobilePhoneNum(phone) {
        return /^[1][0-9]{10}$/.test(phone);
    }
}