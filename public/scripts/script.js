const activities = [
    {
        name: 'Upphopp',
        duration: 30,
        maxDuration: 60,
    },
    {
        name: 'Sprattelgubbe',
        duration: 30,
        maxDuration: 60,
    },
    {
        name: 'Slalom',
        duration: 30,
        maxDuration: 60,
    },
    {
        name: 'Armhävningar',
        duration: 30,
        maxDuration: 60,
    },
    {
        name: 'Situps',
        duration: 30,
        maxDuration: 60,
    },
    {
        name: 'Sova',
        duration: 30,
        maxDuration: 60,
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
const carouselElem = document.querySelector('#carouselExampleControls')
const carouselController = new bootstrap.Carousel(carouselElem)

let selectedActivity

let globalCounter


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
    startActivity(elem.id)
    
}

const startActivity = (activityID) => {
    const currActivity = activities[parseInt(activityID)]
    currentActivityName.innerHTML = currActivity.name
    currentActivityDuration.innerHTML = '----'

    clearCountdown()
    
    showModal(currActivity)
}

const showModal = (activity) => {
    selectedActivity = activity
    startActivityModal.classList.add('modal-active')
    
    modalInfo.innerHTML = `Vill du göra ${activity.name} i ${activity.duration} sekunder?` 
}

const addEventListenersToModalButtons = () => {
    modalGambleBtn.addEventListener('click', gambleBtnClicked)
    modalStayBtn.addEventListener('click', stayBtnClicked)
}

const gambleBtnClicked = () => {
    const duration = Math.floor((Math.random() * selectedActivity.maxDuration))
    startActivityCountdown(duration)
    startActivityModal.classList.remove('modal-active')
}

const stayBtnClicked = () => {
    startActivityCountdown(selectedActivity.duration)
    startActivityModal.classList.remove('modal-active')
}

const startActivityCountdown = (startTime) => {
    currentActivityDuration.innerHTML = `${startTime}`
    globalCounter = setInterval(() => {
        startTime -= 1
        if(startTime === 0) {
            clearInterval(globalCounter)
            carouselController.next()
        }
        currentActivityDuration.innerHTML = `${startTime}`
    }, 1000)
}

const clearCountdown = () => {
    if (globalCounter) {
        clearInterval(globalCounter)
    }
}

addActivity()
addEventListenersToModalButtons()
