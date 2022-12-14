const capotes = document.getElementsByClassName('capote');

let checkBox = document.querySelector('.captchat');
checkBox.addEventListener('click', function (e) {
    captchat();
});
document.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        focus_press(event);
    }
});
let selected = [];
const ggg = ['1.svg', '2.svg'];
const bbb = [
    '3.svg',
    '4.svg',
    '5.svg',
    '6.svg',
    '7.svg',
    '8.svg',
    '9.svg',
    '10.svg'
];

// show captchat
function captchat(argument) {
    let gg = ggg.map((x) => x);
    let bb = bbb.map((x) => x);
    let g = Math.floor(Math.random() * 8);
    let done = [];
    selected = [];
    let capt = document.createElement('div');
    capt.classList.add('captchat_select');
    checkBox.style.backgroundColor = 'white';
    checkBox.querySelector('#check_capt').classList.remove('check_valide');

    for (var i = 0; i < 9; i++) {
        if (i !== g) {
            let index_g = Math.floor(Math.random() * bb.length);

            let img_path = bb[index_g];
            let img = document.createElement('img');
            img.src = 'assets/captchat/' + img_path;
            img.name = img_path;
            img.addEventListener('click', function (ev) {
                toggle_img(ev.target);
            });
            img.tabIndex = 1;
            bb[index_g] = bb[bb.length - 1];
            bb.pop();

            capt.appendChild(img);
        } else {
            let index_g = Math.floor(Math.random() * gg.length);

            let img_path = gg[index_g];
            let img = document.createElement('img');
            img.src = 'assets/captchat/' + img_path;
            img.name = img_path;
            img.addEventListener('click', function (ev) {
                toggle_img(ev.target);
            });
            img.tabIndex = 1;
            gg[index_g] = gg[gg.length - 1];
            gg.pop();
            capt.appendChild(img);
        }
    }
    let btn = document.createElement('button');
    btn.setAttribute('id', 'btnValider');
    btn.innerHTML = 'Valider';
    btn.addEventListener('click', validate);
    capt.appendChild(btn);

    let btn_close = document.createElement('button');
    btn_close.setAttribute('id', 'closeModal');
    btn_close.classList.add('close');
    btn_close.innerHTML = 'X';
    btn_close.addEventListener('click', close_cap);

    capt.appendChild(btn_close);
    document.body.appendChild(capt);
    toggleModal();

    onkeyup = (e) => {
        if (e.shiftKey && e.key === 'C') {
            captchat();
        }

        if (e.shiftKey && e.key === 'V') {
            btn.click();
        }

        if (e.shiftKey && e.key === 'X') {
            btn_close.click();
        }
    };
}

// select/ deselect img
function toggle_img(target) {
    target.classList.toggle('selected');
    if (selected.includes(target.name)) {
        selected[selected.indexOf(target.name)] = selected[selected.length - 1];
        selected.pop();
    } else {
        selected.push(target.name);
    }
}

// check if captchat is valide
function validate(ev) {
    console.log('clikec');
    console.log(selected, selected.length === 1, ggg.includes(selected[0]));
    console.log(ggg, selected[0]);
    if (selected.length === 1 && ggg.includes(selected[0])) {
        checkBox.querySelector('#check_capt').classList.add('check_valide');
        checkBox.style.backgroundColor = 'lightgreen';
    } else {
        checkBox.style.backgroundColor = 'red';
        checkBox.querySelector('#check_capt').classList.remove('check_valide');
    }

    document.body.removeChild(document.querySelector('.captchat_select'));
}

// close captchat
function close_cap(ev) {
    //checkBox.style.backgroundColor="red";
    checkBox.querySelector('#check_capt').classList.remove('check_valide');
    document.body.removeChild(document.querySelector('.captchat_select'));
}

// check focus element
function focus_press(ev) {
    if (document.activeElement.classList.contains('captchat')) {
        captchat();
    } else if (document.activeElement.tagName.toLowerCase() == 'img') {
        toggle_img(document.activeElement);
    }
}

const background = document.getElementById('background');
const modal = document.getElementById('modal');
const close = document.getElementById('close');

function toggleModal() {
    background.classList.toggle('show');
    modal.classList.toggle('show');
    for (let index = 0; index < capotes.length; index++) {
        const element = capotes[index];
        element.classList.toggle('active');
    }
    document.querySelector('.close').focus();
}

background.addEventListener('click', () => {
    toggleModal();
});
close.addEventListener('click', () => {
    toggleModal();
});
