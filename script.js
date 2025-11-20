const newworker = document.getElementById('newworker')
const formbg = document.getElementById('form-bg')
const form = document.getElementById('form')
const inputs = document.querySelectorAll('.input')


newworker.addEventListener('click', () => {
    formbg.classList.remove('hidden')
})
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        formbg.classList.add('hidden')
        inputs.forEach(input => {
            input.value = ''
        })
        clearDynamicForms()
    }
})
formbg.addEventListener('click', () => {
    formbg.classList.add('hidden')
    inputs.forEach(input => {
        input.value = ''
    })
    clearDynamicForms()
})

form.addEventListener('click', (e) => {
    e.stopPropagation()
})


const workers = [
]


const workersSide = document.getElementById('workers-container')


const addex = document.getElementById('addex')
const dynamic = document.querySelector('.dynamic')
const exForm = document.querySelector('.experience-form')

addex.addEventListener('click', (e) => {
    e.preventDefault()
    const newformContainer = document.createElement('div')
    newformContainer.className = "flex flex-col gap-2 justify-center items-center"
    const remove = document.createElement('button')
    remove.innerHTML = `<ion-icon name="trash-sharp"></ion-icon> Remove`
    remove.className = "bg-red-500 px-2 rounded-full text-white flex justify-center items-center gap-1 py-1"
    let newform = exForm.cloneNode(true)

    let inputs = newform.querySelectorAll('input')
    inputs.forEach(input => {
        input.value = ''
    }
    )
    newformContainer.appendChild(newform)
    newformContainer.appendChild(remove)
    dynamic.appendChild(newformContainer)

    remove.addEventListener('click', () => {
        dynamic.removeChild(newformContainer)
    })
})

function clearDynamicForms() {
    const alldynamicForms = document.querySelectorAll('.experience-form')
    alldynamicForms.forEach((form, index) => {
        if (index > 0) form.parentElement.remove()
    })
}

const addworker = document.getElementById('addworker')


form.addEventListener('submit', (e) => {
    if (nameValidation() && emailValidation() && numberValidation()) {
        formbg.classList.add('hidden')
        Toastify({
            text: "new worker added",
            duration: 3000,
            gravity: "top",
            position: "center"
        }).showToast();

        let obj = {}
        let experiences = []

        inputs.forEach(input => {
            obj[input.name] = input.value;
            input.value = ''
        })

        const exforms = document.querySelectorAll('.experience-form')
        exforms.forEach(form => {
            let objex = {}
            form.querySelectorAll('input').forEach(input => {
                objex[input.name] = input.value
            })
            experiences.push(objex)
        })

        obj.experiences = experiences;
        workers.push(obj)
        console.log(workers)

        refreshSideList()

            formbg.querySelectorAll('input').forEach(field => {
                field.value = ''
            })

            // dynamic.removeChild(newform)
            clearDynamicForms()

    } else {
        alert('false')
    }

    e.preventDefault()
})

const urlinput = document.getElementById('urlpreview')

const preview = document.getElementById('preview-img')

// preview pfp of the form
urlinput.addEventListener('change', () => {
    preview.src = `${urlinput.value}`
})
// form validation
function nameValidation() {
    const fullname = form.querySelector('#fullname').value.trim()
    const namevalid = /^[a-zA-Z]{2,}\s[a-zA-z]{2,}$/g

    if (namevalid.test(fullname)) {
        // form.querySelector('#fullname').classList.add('bg-red-400')
        return true
    }
}
function emailValidation() {
    const email = form.querySelector('#email').value.trim()
    const emailvalid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (emailvalid.test(email)) return true
}
function numberValidation() {
    const number = form.querySelector('#number').value.trim()
    const numberValid = /\+(212)(5|6|7)[0-9]{8}/g

    if (numberValid.test(number)) return true
}
// function experienceValidation(){
//     const fromdate = exForm.querySelector('.from').value
//     console.log(fromdate)
// }


workersSide.addEventListener('click', (e) => {
    const box = e.target.closest('.worker-box')
    if (box) {
        const id = box.dataset.id
        const worker = workers[id]
        // console.log(worker)
        const profile = document.createElement('div')
        profile.className = "fixed  h-full w-full flex justify-center items-center bg-[rgba(0,0,0,.2)] backdrop-blur"
        profile.innerHTML = `
        <div class="profile-popup   lg:h-[80%] lg:w-[23em] h-[70vh] w-[90%] bg-white rounded-lg overflow-y-scroll [scrollbar-width:none]">
            <div id="banner" class="[background-image:url(img/banner.jpg)] bg-cover h-32 relative pl-4">
                <div class="rounded-full w-20 h-20 absolute translate-y-[50%] bottom-0 p-1 bg-white">
                    <img src="${worker.picture}" alt="" class="rounded-full h-full w-full">
                </div>
            </div>
            <div id="infos" class="flex flex-col justify-center pt-12 pl-4 gap-2">
                <h1 class="font-bold text-xl">${worker.fullname}</h1>
                <p class="text-gray-900 bg-gray-200 w-fit px-3 text-[0.7rem] rounded-full py-[0.2rem]"><i class="fa-solid fa-briefcase"></i> ${worker.job}</p>
                <p class="text-gray-900 bg-gray-200 w-fit px-3 text-[0.7rem] rounded-full py-[0.2rem]"><i class="fa-solid fa-envelope"></i> ${worker.email}</p>
                <p class="text-gray-900 bg-gray-200 w-fit px-3 text-[0.7rem] rounded-full py-[0.2rem]"><i class="fa-solid fa-phone"></i> ${worker.number}</p>
                <div class="bg-gray-500 h-[0.05rem] mt-4"></div>
                <div id="experiences-section" class="flex flex-col gap-4">
                    <h1 class="text-lg font-semibold">Experiences</h1>
                    ${worker.experiences.map(exp => `
                        <div class="flex flex-col gap-2">
                        <h2>Job: ${exp.exjob}</h2>
                        <h2>Company: ${exp.company}</h2>
                        <div class="flex gap-10">
                            <h2>From: ${exp.from}</h2>
                            <h2>To: ${exp.to}</h2>
                        </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `
        document.body.appendChild(profile)

        // closing profile popup
        profile.addEventListener('click', () => {
            document.body.removeChild(profile)
        })
        document.querySelector('.profile-popup').addEventListener('click', (e) => {
            e.stopPropagation()
        })
    } else {
        return
    }

})


// add to room button
function workersBox(ppl, title, room) {
    let popup = document.createElement('div')
    let popupmodal = document.createElement('div')
    popup.className = 'fixed w-full h-full bg-[rgba(0,0,0,.2)] flex justify-center items-center backdrop-blur'
    popupmodal.className = 'w-[22em] h-[20em]  rounded-lg  bg-white flex flex-col gap-2 items-center overflow-y-scroll [scrollbar-width:none]'

    // Title
    let titleEl = document.createElement('h2')
    titleEl.textContent = title
    titleEl.className = "font-bold text-lg p-2"
    popupmodal.appendChild(titleEl)

    // Add workers
    ppl.forEach(worker => {
        let originalindex = workers.indexOf(worker)

        let box = document.createElement('div')
        box.className = "worker-box flex w-[90%] h-15 rounded-lg [box-shadow:0_10px_10px_rgba(0,0,0,.1)] gap-4 items-center px-3"
        box.dataset.id = originalindex

        let img = document.createElement('img')
        img.src = worker.picture
        img.className = "rounded-full w-10 h-10"

        let txt = document.createElement('div')
        txt.innerHTML = `
        <h2 class="font-bold">${worker.fullname}</h2>
        <p class="text-sm text-gray-500">${worker.job}</p>
        `

        box.appendChild(img)
        box.appendChild(txt)
        popupmodal.appendChild(box)
    })

    popup.appendChild(popupmodal)
    document.body.appendChild(popup)

    popup.onclick = () => {
        document.body.removeChild(popup)
    }
    popupmodal.onclick = (e) => {
        e.stopPropagation()
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(popup)
        }
    })
    // add them to the rooms

    popupmodal.addEventListener('click', (e) => {
        let box = e.target.closest('.worker-box')
        if (box) {
            let id = box.dataset.id
            let worker = workers[id]
            workers[id].assigned = true
            let newbox = document.createElement('div')
            newbox.className = "worker-box flex h-15 rounded-lg bg-white [box-shadow:0_10px_10px_rgba(0,0,0,.1)] gap-4 items-center px-3"
            newbox.dataset.id = id

            let img = document.createElement('img')
            img.src = worker.picture
            img.className = "rounded-full w-10 h-10"

            let txt = document.createElement('div')
            txt.innerHTML = `
            <h2 class="font-bold">${worker.fullname}</h2>
            <p class="text-sm text-gray-500">${worker.job}</p>
            `
            newbox.appendChild(img)
            newbox.appendChild(txt)
            room.appendChild(newbox)
            newbox.innerHTML += `<ion-icon data-id="${id}" name="trash-sharp" class="text-red-400 trash-icon"></ion-icon>`
            refreshSideList()
            // workers = workers.filter(worker => worker.id !== id)

            document.body.removeChild(popup)

        }
        // remove from the room
        const trashbtn = document.querySelectorAll('.trash-icon')
        trashbtn.forEach(trash => {
            trash.addEventListener('click', (e) => {
                let bin = e.target.closest('.worker-box')
                if (bin) {
                    let id = bin.dataset.id
                    room.removeChild(bin)
                    // workers[id].assigned = false
                    delete workers[id].assigned
                    refreshSideList()

                }
            })
        })
    })
}


function displayOnServers() {
    let serverPPL = []
    serverPPL = workers.filter(worker => (worker.job === 'IT' || worker.job === 'Manager' || worker.job === 'Cleaning') && !worker.assigned)
    let serverRoom = document.querySelector('.servers')
    workersBox(serverPPL, "server room", serverRoom)
}
function displayOnSecurity() {
    let securityPPL = []
    securityPPL = workers.filter(worker => (worker.job === 'Security' || worker.job === 'Manager' || worker.job === 'Cleaning') && !worker.assigned)
    let securityRoom = document.querySelector('.security')
    workersBox(securityPPL, "security room", securityRoom)
}
function displayOnArchive() {
    let archivePPL = []
    archivePPL = workers.filter(worker => (worker.job === 'Manager') && !worker.assigned)
    let archiveroom = document.querySelector('.archive')
    workersBox(archivePPL, "archive room", archiveroom)
}
function displayOnReception() {
    let recptionPPL = []
    recptionPPL = workers.filter(worker => (worker.job === 'Receptionist') && !worker.assigned)
    let receptionroom = document.querySelector('.reception')
    workersBox(recptionPPL, "reception room", receptionroom)
}

// their buttons //

const conferenceBtn = document.querySelector('#conference-btn')
conferenceBtn.addEventListener('click', () => {
    let conferenceroom = document.querySelector('.conference')
    const available = workers.filter(worker => !worker.assigned)
    workersBox(available, "conference room", conferenceroom)
})
const receptionBtn = document.querySelector('#reception-btn')
receptionBtn.addEventListener('click', () => {
    displayOnReception()
})
const serversBtn = document.querySelector('#servers-btn')
serversBtn.addEventListener('click', () => {
    displayOnServers()
})
const securityBtn = document.querySelector('#security-btn')
securityBtn.addEventListener('click', () => {
    displayOnSecurity()
})
const staffBtn = document.querySelector('#staff-btn')
staffBtn.addEventListener('click', () => {
    staffPPL = workers.filter(worker => !worker.assigned)
    let staffroom = document.querySelector('.staff')
    workersBox(staffPPL, "staff room", staffroom)
})
const archiveBtn = document.querySelector('#archive-btn')
archiveBtn.addEventListener('click', () => {
    displayOnArchive()
})

function refreshSideList() {
    workersSide.innerHTML = ''
    workers.forEach((worker, index) => {
        if (!worker.assigned)
            workersSide.innerHTML += `
            <div data-id = '${index}' class="worker-box   flex w-[90%] h-15 rounded-lg [box-shadow:0_10px_10px_rgba(0,0,0,.1)] gap-4 items-center px-3 bg-white">
                <img src="${worker.picture}" alt="" class="rounded-full w-10 h-10">
                <div>
                    <h2 class="font-bold">${worker.fullname}</h2>
                    <p class="text-sm text-gray-500">${worker.job}</p>
                </div>
            </div>
            `
    })
}