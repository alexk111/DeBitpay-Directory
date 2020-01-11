import {showDonationScreen, preloadDonationScreen} from './modules/donation'

$(() => {
  function initDonate() {
    $('button.donate').click(evt => {
      evt.preventDefault()
      showDonationScreen()
    })
    $('button.donate').mouseover(_ => {
      preloadDonationScreen()
    })
  }

  initDonate()
})
