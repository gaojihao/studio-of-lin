function post(url, param = {}) {
  param['terminal'] = 'wechat';
  
  let requestURL = 'https://www.studyhealth.org' + url

  console.log(param)
  console.log(requestURL)

  return new Promise((reslove, reject) => {
    wx.request({
      url: requestURL,
      data: param,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      success: function (res) {
         console.log(res)

        if (res.data.code === 200) {
          reslove(res.data.data)
        } else {
          reject({ error: res.data.message, code: res.data.code })
        }
      },
      fail: function (error) {
        console.log(error)
        reject(error)
      },
      complete: function (res) {

      },
    })
  })
}

//登录
const userLogin = (phone, password) => post('/user/v1/login', { phone: phone, password: password, token:"98d2776d4b6c4117a76434809b9f631e"})
//发送验证码
const sendSMS = (phone, type) => post('/user/v1/smsCode', { phone: phone,type:type})
//注册
const userRegister = (phone, smsCode, password) => post('/user/v1/register', { phone,smsCode,password})
//忘记密码
const setNewPassword = (phone, smsCode, password) => post('/user/v1/forgetPassword', { phone,smsCode,password})
//修改密码
const modifyPassword = (token, password, newPassword) => post('/user/v1/modifyPassword', { token, password, newPassword})
//修改手机号
const modifyPhone = (token, phone, smsCode, password) => post('/user/v1/changePhone', { token, phone, smsCode, password})
//获取个人信息
const getUserInfo = (token) => post('/user/v1/info', { token})
//更新个人信息
const updateUserInfo = (param) => post('/user/v1/infoUpdate', param)
//获取个人医疗信息
const getMedicalInfo = (token) => post('/user/v1/medical', { token})
//更新个人医疗信息
const updateMedicalInfo = (token) => post('/user/v1/medicalAdd', { token,medicalId})


//获取城市列表
const getCity = (token) => post('/hospital/v1/cities', { token })

//获取医生列表
const getDoctorList = (token) => post('/hospital/v1/listDr', { token })

//获取医生预约信息
const doctorOrderDetail = (token, doctorId) => post('/doctor/v1/orderDetail', { token, doctorId })

//医生预约
const doctorOrder = (token, doctorId, orderId) => post('/doctor/v1/orderAdd', { token, doctorId, orderId })

//我的预约记录
const myOrders = (token) => post('/user/v1/orderList', { token })

//取消预约
const cancelOrder = (token, doctorId, orderId) => post('/user/v1/orderCancel', { token, doctorId, orderId })

//随访
const mySurvey = (token) => post('/user/v1/mySurvey', { token })

/**
 * 咨询
 */
const consult = (param) => post('/user/v1/consult/send', param)

/**
 * 咨询列表
 */
const consultList = (token) => post('/user/v1/consult/list', { token })

/**
 * 信息列表
 */
const operationList = (token) => post('/user/v1/operation/list', { token })


/**
 * 在线问诊列表
 */
const doctorContact = (token) => post('/hospital/v1/doctor/contact', { token })


/**
 * 健康教育
 */
const healthEdu = () => post('/hospital/v1/health/education', {})

/**
 * 康复指南
 */
const healthGuide = () => post('/hospital/v1/health/guide', {})


/**
 * 评测问卷
 */
const evaluateQA = () => post('/hospital/v1/evaluate/question', {})

/**
 * 报告查询
 */
const reportList = (token) => post('/user/v1/report/list', { token })

/**
 * 随访记录
 */
const surveyList = (token) => post('/user/v1/survey/list', { token })

/**
 * 随访记录
 */
const hospitalInfo = (token) => post('/hospital/v1/info', { token })

/**
 * 创建病友分享
 */
const addFeedback = (token) => post('/user/v1/feedback/addFeedback', { token })

/**
 * 病友圈一览
 */
const feedbacks = (token) => post('/user/v1/feedback/feedback', { token })

module.exports = {
  userLogin: userLogin,
  sendSMS: sendSMS,
  userRegister: userRegister,
  setNewPassword: setNewPassword,
  modifyPassword: modifyPassword,
  modifyPhone: modifyPhone,
  getUserInfo: getUserInfo,
  updateUserInfo: updateUserInfo,
  getMedicalInfo: getMedicalInfo,
  updateMedicalInfo: updateMedicalInfo,
  getCity,
  getDoctorList,
  doctorOrderDetail,
  doctorOrder,
  myOrders,
  cancelOrder,
  mySurvey,
  consult,
  consultList,
  operationList,
  doctorContact,
  healthEdu,
  healthGuide,
  evaluateQA,
  reportList,
  surveyList,
  hospitalInfo,
  addFeedback,
  feedbacks
}