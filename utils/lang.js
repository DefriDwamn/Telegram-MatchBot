const male = 'Парень';
const males = 'Парни';
const female = 'Девушка';
const females = 'Девушки';
const anySex = 'Любой';

const startText = '/start';
const profileText = '/profile';

const emodjiEdit = '\uD83D\uDCDD';
const emodjiMatch = '\uD83D\uDD2B';
const emodjiLike = '\uD83D\uDC40';
const emodjiDisLike = '\uD83E\uDD2E';
const emodjiLeaveMatch = '\uD83D\uDEAA';


const startRegExp = new RegExp(`${startText}`);
const profileRegExp = new RegExp(`${profileText}`);
const matchRegExp = new RegExp(`(${emodjiMatch}|${emodjiLike}|${emodjiDisLike}|${emodjiLeaveMatch})`);
const profileEditRegExp = new RegExp(`${emodjiEdit}`);

module.exports = {
    male,
    males,
    female,
    females,
    anySex,
    startRegExp,
    profileRegExp,
    matchRegExp,
    profileEditRegExp,
    emodjiEdit,
    emodjiMatch,
    emodjiLike,
    emodjiDisLike,
    emodjiLeaveMatch
}
