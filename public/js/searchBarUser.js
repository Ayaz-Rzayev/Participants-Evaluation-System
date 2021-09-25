const participantInput = document.querySelector('.participant-search-input')
const participants = document.querySelectorAll('.participant-div')
const participantLabel = document.querySelectorAll('.participant-label')
const pmInput = document.querySelector('.pm-search-input')
const pm = document.querySelectorAll('.pm-div')
const pmLabel = document.querySelectorAll('.pm-label')

function searchForUser(input, users, containerDiv){
  for(let i = 0; i < users.length; i++){
    if(users[i].innerText.toLowerCase().indexOf(input.value.toLowerCase()) > -1){
      containerDiv[i].style.display =''
    }else{
      containerDiv[i].style.display ='none'
    }
  }
}
participantInput.addEventListener('keyup', function(){
  searchForUser(participantInput, participantLabel, participants)
})
pmInput.addEventListener('keyup', function(){
  searchForUser(pmInput, pmLabel, pm)
})