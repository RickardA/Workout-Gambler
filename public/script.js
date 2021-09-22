const activities = [
    {
        name: 'Upphopp',
        duration: 30,
    },
    {
        name: 'Sprattelgubbe',
        duration: 30,
    },
    {
        name: 'Slalom',
        duration: 30,
    },
    {
        name: 'Armhävningar',
        duration: 30,
    },
    {
        name: 'Situps',
        duration: 30,
    },
    {
        name: 'Sova',
        duration: 30,
    }
]

// All the components //

const carousel = document.getElementsByClassName('carousel-inner')[0]
const currentActivityName = document.getElementById('current-activity-name')
const currentActivityDuration = document.getElementById('current-activity-duration')
const startActivityModal = document.getElementById('start-activity-modal')
const modalTitle = document.getElementById('modal-title')
const modalInfo = document.getElementById('modal-info')
const modalGambleBtn = document.getElementById('modal-gamble-btn')
const modalStayBtn = document.getElementById('modal-stay-btn')

let selectedActivity


const addActivity = () => {
    activities.forEach((acitvity, index) => {
        const div = document.createElement('div')
        const title = document.createElement('h2')
        title.innerHTML = acitvity.name
        div.appendChild(title)
        
        const duration = document.createElement('h3')
        duration.innerHTML = `${acitvity.duration}`
        div.appendChild(duration)
        
        div.classList.add('carousel-item')
        if (index === 0) {
            div.classList.add('active')
        }
        
        div.addEventListener('click',() => {
            activityClicked(div)
        })
        
        div.id = index
        
        carousel.appendChild(div)
    })
}

const activityClicked = (elem) => {
    console.log('Activity clicked ', elem.id)
    startActivity(elem.id)
    
}

const startActivity = (activityID) => {
    const currActivity = activities[parseInt(activityID)]
    currentActivityName.innerHTML = currActivity.name
    currentActivityDuration.innerHTML = `${currActivity.duration}`
    
    showModal(currActivity)
}

const showModal = (activity) => {
    selectedActivity = activity
    startActivityModal.classList.add('modal-active')
    
    console.log(modalInfo)
    modalInfo.innerHTML = `Do you want to do ${activity.name} for ${activity.duration}` 
}

const addEventListenersToModalButtons = () => {
    modalGambleBtn.addEventListener('click', gambleBtnClicked)
    modalStayBtn.addEventListener('click', stayBtnClicked)
}

const gambleBtnClicked = () => {
    console.log('Gamble')
}

const stayBtnClicked = () => {
    console.log('Stay')
    startActivityCountdown()
    startActivityModal.classList.remove('modal-active')
}

const startActivityCountdown = () => {
    console.log('Start activity with time ')
    let startTime = selectedActivity.duration
    const countdown = setInterval(() => {
        if(startTime === 0) {
            clearInterval(countdown)
        }
        startTime -= 1
        currentActivityDuration.innerHTML = `${startTime}`
    }, 1000)
}

addActivity()
addEventListenersToModalButtons()
