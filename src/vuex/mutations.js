import axios from 'axios';

export default {
    updateLoadingStatus(state, payload) {
        state.isLoading = payload.isLoading
    },
    //设置用户的厦航工号
    updateUserCode(state, userCode) {
       state.userCode = userCode;
        // axios.get('../../phone/initUser.json?code='+userCode,{timeout: 20000}).then(function (data) {
        //     state.userCode=data.data.code;
        //     console.log(data.data);
        // }).catch((err) => {
        //     console.log('执行错误');
        // });
    }
}
