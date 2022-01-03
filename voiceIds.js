const path = require('path')
const FabioIntro = path.join(__dirname, './intros/FabioIntro.wav')
const DemetriIntro = path.join(__dirname, './intros/DemetriIntro.mp3')
const AntonioIntro = path.join(__dirname, './intros/Antonio2.mp3')
const TobinIntro = path.join(__dirname, './intros/TobinIntro.wav')
const SammyIntro = path.join(__dirname, './intros/SAMMYINTRO.mp3')

const ids = [
    {
        id : 799395962845134929,
        intro : FabioIntro
    },
    {
        id : 445064070820003850,
        intro : DemetriIntro
    },
    {
        id : 371424155288993802,
        intro : TobinIntro
    },
    {
        id : 404682107512946691,
        intro : AntonioIntro
    },
    {
        id: 401131400087994377,
        intro: SammyIntro
    }
]

module.exports = ids;