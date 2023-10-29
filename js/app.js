
const audio = (() => {
    let instance = null;

    let createOrGet = () => {
        if (instance instanceof HTMLAudioElement) {
            return instance;
        }

        instance = new Audio();
        instance.autoplay = true;
        instance.src = document.getElementById('song').getAttribute('data-url');
        instance.load();
        instance.currentTime = 0;
        instance.volume = 1;
        instance.muted = false;
        instance.loop = true;

        return instance;
    }

    return {
        play: () => {
            createOrGet().play();
        },
        pause: () => {
            createOrGet().pause();
        }
    };
})();

const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

const buka = async () => {
    document.getElementById('song').style.display = 'block';
    audio.play();
    AOS.init();
    await login();
    timer();
};

window.addEventListener('load', () => {
    let name = (new URLSearchParams(window.location.search)).get('to') ?? '';

    if (name.length == 0) {
        document.getElementById('namatamu').remove();
    } else {
        let div = document.createElement('div');
        div.classList.add('m-2');
        div.innerHTML = `
        <div class="dear">Kepada Yth. Bapak/Ibu/Saudara/i</div>
        <h2 class="namatamu">${escapeHtml(name)}</h2>
        `;

        // document.getElementById('formnama').value = name;
        document.getElementById('namatamu').appendChild(div);
    }

    // modal.show();
    // opacity();
}, false);

const sampul = jQuery('.modalx').data('sampul');
jQuery('.modalx').css('background-image','url('+sampul+')');
jQuery('body').css('overflow','hidden');
jQuery('.wdp-button-wrapper button').on('click',function(){
    jQuery('.modalx').addClass('removeModals');
    jQuery('body').css('overflow','auto');

});

var isYT = false;
jQuery( "#wdp-button-wrapper" ).on( "click", "button", function() {
    // var isYT = false;
    playAudio();
	if(document.body.contains(document.getElementById("song"))) {
		document.getElementById("song").play();
		isYT = false;
	} else {
		isYT = true;
		player.playVideo();
	}
    function playAudio(){
        var isYT = false;
        if(document.body.contains(document.getElementById("song"))) {
            document.getElementById("song").play();
            isYT = false;
        } else {
            isYT = true;
            player.playVideo();
        }
    }
});

if(jQuery('.namatamu').length  >= 1){
    let tmpHtmlNamatamu = document.querySelectorAll('.namatamu')
    tmpHtmlNamatamu.forEach((tamuTexts) => {
        tamuTexts.innerHTML = cleanIts(tamuTexts.innerHTML); 
    });
}

function cleanIts(str){

    return jQuery("<textarea></textarea>").html(str.replace(/\\/g,"")).text();
}