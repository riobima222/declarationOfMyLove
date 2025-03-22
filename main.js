const paragraf = [
    'السلام عليكم ورحمة الله وبركاته',
    `Hallo Mb Lina`,
    `saya bingung mau mulai dari mana . langsung saja ke intinya :`,
    `saya suka sama kamu mb , saya pengen serius sama kamu.`,
    `saya gak tahu ini langkah yang benar atau salah , tapi semoga benar.`,
    `kadang hati berkata maju , tapi pikiran berkata tunggu.`,
    `saya percaya segala sesuatu ada waktunya , mungkin ini terlalu cepat , atau malah justru ini waktu yang tepat , saya cuma pengen jujur pada perasaan ini.`,
    `jika ini langkah yang salah , biarlah menjadi kesalahan yang lahir dari kejujuran , bukan dari kebohongan yang di pendam terlalu lama.`,
    `walaupun sebenarnya saya sadar , mungkin belum waktunya bilang begini , karena saya masih proses berjuang.`,
    `tapi kata ibu saya : kalo suka ya bilang dulu aja gpp , biar gak nyesel , nanti allah yang atur.`,
    `yah walaupun ragu , takut gimana nanti kedepannya , gimana ya , ngrasa belum pantes aja bilang begini , tapi semakin ditahan malah semakin pengen ngomong , dari pada nanti nyesel belum sempet ngomong , yaudah ngomong aja.`,
    `saya gak tahu kapan mulai mencintai mu , tapi yang pasti saat ini sudah terlalu dalam , seperti nya bukan cinta bisa , cinta yang selalu tumbuh , semakin besar setiap bertemu.`,
    `saya gak pengen janji apa - apa , karena juga belum punya apa - apa , gak pengen ngajak pacaran , apalagi melanggar dan semacamnya.`,
    `saya pengen mencintai dengan cara yang paling terhormat.`,
    `gak ada niat apa - apa selain hanya ingin kamu tahu & yang terpenting mendapat sebuah do'a.`,
    `kalo gak keberatan , cuman pengen selipan di setiap do'a mu , do'akan semoga beberapa tahun kedepan Allah berikan rezeki yang banyak , do'akan Allah qodar bisa segera datang dan melamar mu dengan kesiapan yang cukup , merasa pantas bediri di samping mu , tanpa merasa rendah atau apapun.`,
    `dan selama perjalanan ini kalau ada seorang yang melamar mu lebih dulu , kalau kamu yakin , saya gpp, saya setuju dengan penulis terkenal Khalil Gibran , katanya , cinta sejati itu cinta yang memberikan kebebasan.`,
    `saya akan berusaha sekuat tenaga yang saya bisa , walaupun pada akhirnya , Tuhan penentunya.`,
    `semua itu hanya sebuah keinginan saya , banyak juga keinginan saya yang tidak tercapai , tapi semoga yang ini tercapai.`,
    `sekian surat dari saya , surat yang saya tulis sendiri dengan kesadaran penuh , surat yang saya buat dengan hati penuh ragu - ragu dan ketakutan , surat yang gak tahu lagi udah berapa kali di perbaiki , surat yang walaupun sudah jadi pun , saya masih bingung mau dikirim apa nggak.`,
    `thanks sudah baca sampe akhir mb , semoga bisa diterima dengan hati yang baik , alhamdulillah jazakillahu khoiro.`,
    `16 - Maret - 2025`,
    `buat "Mb lina"`,
    `I 💕 U`
  ];


// ambil element yang di gunakan untuk menampilkan text :
const content = document.getElementById('content');

// membuat index
let paragrafIndex = 0;
let isPaused = false;
let isStarted = false;
let typingTimeout;

function typeParagraf (text, index, callback) {
    // membuat element paragraf
    const p = document.createElement('p');
    // menambahkan element p baru ke dalam element content
    content.appendChild(p);
    // membuat index char
    let charIndex = 0;
    
    // membuat fungsi untuk mengetik satu persatu
    function typeChar () {
        if ( isPaused ) {
            typingTimeout = setTimeout(typeChar, 30);
            return;
        }
        if ( charIndex < text.length ) {
            p.innerHTML += text.charAt(charIndex);
            charIndex++
            typingTimeout = setTimeout(typeChar, 30);
        } else {
            setTimeout(callback, 1000);
        }
    }
    typeChar();
}

function starTyping () {
    if ( isPaused || paragrafIndex >= paragraf.length ) return;

    isStarted = true;

    typeParagraf(paragraf[paragrafIndex], paragrafIndex, () => {
        paragrafIndex++;
        starTyping();
    })
}

function pauseTyping () {
    isPaused = true;
    clearTimeout(typingTimeout);
}

function resumeTyping () {
    if ( !isStarted ) {
        starTyping();
    } else if (isPaused) {
        isPaused = false;
        starTyping();
    }

}

const amplop = document.querySelector('.amplop');
const music = document.getElementById('bgMusic');

amplop.addEventListener("click", function () {
    setTimeout(() => {
        music.volume = 0; // Mulai dengan volume 0
        music.play();
        
        let volume = 0;
        const fadeIn = setInterval(() => {
            if (volume < 1) {
                volume += 0.001; // Naikkan volume secara bertahap
                music.volume = Math.min(volume, .11); // Pastikan tidak lebih dari 1
            } else {
                clearInterval(fadeIn); // Hentikan interval setelah volume penuh
            }
        }, 1);
    }, 1500)
    document.querySelector(".surat").classList.toggle("animate");
    setTimeout(() => {
        document.querySelector(".isi-surat").classList.toggle("suratAnimateON");
        setTimeout(() => {
            document.querySelector(".surat").classList.toggle("animate");
        }, 500);
    }, 800);

    if (!isStarted) {
        setTimeout(() => {
            starTyping();
        }, 5000)
    } else {
        resumeTyping();
    }
})

const close = document.querySelector(".close");

close.addEventListener("click", () => {
    document.querySelector(".isi-surat").classList.toggle("suratAnimateOFF");
    setTimeout(() => {
        document.querySelector(".isi-surat").classList.toggle("suratAnimateON");
        document.querySelector(".isi-surat").classList.toggle("suratAnimateOFF");
    }, 2000);
    pauseTyping();
    music.pause();
})