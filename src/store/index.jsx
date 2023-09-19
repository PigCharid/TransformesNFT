import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  modal: 'scale-0',
  castmodal: 'scale-0',
  claimrewardsmodal: 'scale-0',
  withdrawmodal: 'scale-0',
  updateModal: 'scale-0',
  showModal: 'scale-0',
  alert: { show: false, msg: '', color: '' },
  loading: { show: false, msg: '' },
  kline:"BTC",
  lskline:"BTC",
  leverage:1.1,
  Tinfo:{
    ID:"0",
    name:"Transformers",
    owner:"0x00",
    level:1,
    fight:false,
    timeOfTotalFight:0,
    timeOfLastFight:0,
    totalReward:0
  },
  tname:"",
  xtsBalance:0
})

const setAlert = (msg, color = 'green') => {
  setGlobalState('loading', false)
  setGlobalState('alert', { show: true, msg, color })
  setTimeout(() => {
    setGlobalState('alert', { show: false, msg: '', color })
  }, 3000)
}

const setLoadingMsg = (msg) => {
  const loading = getGlobalState('loading')
  setGlobalState('loading', { ...loading, msg })
}

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars)
    var end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  setAlert,
  setLoadingMsg,
  truncate,
}
