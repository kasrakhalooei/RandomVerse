function getNewRandomPoem() {
    const box = document.getElementById('poem-box');
    box.innerText = 'در حال بارگذاری...';

    fetch('https://api.allorigins.win/raw?url=https://c.ganjoor.net/beyt.php')
    // fetch('https://api.allorigins.win/raw?url=https://ganjoor.net/random')
        .then(res => res.text())
        .then(html => {
            console.log(html)
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const line1 = doc.querySelector('.ganjoor-m1')?.innerText;
            const line2 = doc.querySelector('.ganjoor-m2')?.innerText;
            const poetLink = doc.querySelector('.ganjoor-poet a');
            const poet = poetLink?.innerText || 'نامشخص';
            const href = poetLink?.href || '#';

            const poem = `${line1}\n${line2}`;

            box.innerHTML = `
        <strong>${poet}</strong><br/>
        ${poem.replace(/\n/g, '<br/>')}
        <br/><a href="${href}" target="_blank">مشاهده شعر کامل</a>
      `;
        })
        .catch(err => {
            console.error(err);
            box.innerText = 'خطا در دریافت شعر.';
        });
}
