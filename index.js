//yang mau ditanya
/** */

//pemanggilan serta penamaan (start)

const express = require('express'); 
/*variable const dipilih agar tidak dapat diubah-ubah datanya contohnya
    const nomor_1 = 5; <- ini nama tetap
    nomor_1 = 4; <- jika tidak sesuai dengan const nya maka dia tidak akan menerimanya (kaku)

 * require ini untuk memanggil express.js nya dengan parameter express? 
 *nanti parameternya untuk ke const app? (tidak tahu) */

const app = express(); 
/*app ini adalah sebuah penamaan untuk menggantikan nama express
 *namamya bisa dubah jadi bebas (tergantung kepemahaman kita)
 *di expressnya tidak perlu diberikan parameter*/

const port = 8000; 
/*ini portnya bebas yangg penting ngisinya di port yang kosong
 * ini port buat servernya? */ 

const {longger} = require ('./middleware/middleware')
/*ini require untuk memanggil folder middlewarenya serta file middleware
 * longger itu opsional
 *fungsinya cuma memberikan informasi ke terminal 
 *kalau si servernya sudah berjalan atau belum atau tidak bisa */

//penamaan dan pemanggilan (end)

//ini katanya untuk menjalankan express dengan bertahap? (start)

app.use(express.json());
/*app/express menggunakan/menjalankan express.json sebagai mesinnya?*/

app.use(logger);
/*app.use(logger) ini untuk menggunakan si logger/pemberi informasi ke terminal*/

app.listen(port, 'localhost', () => {
/*app.listen si server mendengarkan?
 * mendengarkan port sama localhost aja / sebagai isian dalam httpnya?*/

    console.log(`server berjalan di port ${port}`)
    /*console.log untuk ngeprint hasil dari si server?
     * lalu logger ada hubungannya tidak denga ini?
     * apakah console.log dapat menggantikan logger? kafrena katanya opsional*/
});

app.get('/data', (request, response) => {
    /*si express mengambil hello, hello itu apa?
     *nanti si server akan meminta perintah ke client/request 
     dan nanti server akan memberikan balasan ke client berupa hasil/response*/

    return response.send('data dari expressjs');
    /*return saya lupa tapi yang saya inget pusing dan membingungkan
     * response.send sama seperti console.log? untuk mengeprint tulisan/pesan?
     * tulisan/pesannya berupa diatas*/
});

//menjalankan express(end)

//ini isian/kumpulan database (start)

let pasiens = [
    /*dipilih let variablenya supaya dapat diubah-ubah datanya contohnya
        let nomor_1 = 5;
        nomor_1 = 4; <- jika tidak sesuai masih bisa berjalan? (fleksible)

     * dan diberi nama yang jamak yaitu pasiens s = banyak pasien*/

    {id: 1, nama: 'uvuveveve unyutewewe uvugegege osas', umur: '1000', gender: 'laki-laki', nomor_daftar_pasien: '123', ruang_dokter: 'XI TJKT 2'},
    /* ini adalah isi databasenya
     * jika satu prawl aja disebutnya objek
     * jika banyak (tadi lupa)
     * id itu akan digunakan pada saat nanti parseInt?
     * jika tidak diberikan id pun saat pencarian nanti bisa*/
];

//kumpulan database (end)

//menjalankan database? (start)

app.get('/pasiens', (request,response) => {
    /*untuk mengambil database dengan nama /pasiens
     * jika hanya pasiens saja saat mau mengambil databasenya 
     * maka akan diberikan seluruh datanya dan tidak ada yang spesifik sedikitpun
     * dan si server akan meminta masukkan perintah dan memberikan jawaban/data nya*/

    response.status(200).json(pasiens);
    /**si client meminta status responnya menjadi 200 yang artinya ok
     * json(pasiens) kita mau menjalankan si json di database pasiens*/
});

//menjalankan database (end)

//pengambilan data spesifik (start)

app.get('/pasiens/:id', function (request, response) {
    /*ini untuk mengambil dari pasiens dan dengan id (terserah yang penting ada di dalam databasenya)*/

    const pasien = pasiens.find((data) => 
        /*di pasien diberikan variable const karena supaya tidak dapat berubah-ubah datanya 
         * dan diberikan nama pasien untuk mengganti nama pasiens
         * pasiens.find artinya si pasien disuruh mencari data 
         * dengan parameter (data) yang ada di database pasiens*/

        data.id === parseInt(request.params.id));
        /*data.nama adalah data yang nanti spesifik hanya untuk mencari nama saja, sisanya tidak 
         * beda jika diberikan id pada setiap databasenya contoh
         * {id: 1, apa}
         * {id: aku, mengapa} dst
         * jika kita memanggil idnya serta angka/katanya
         * server akan memberikan data secara spesifik sesuai yang kita inginkan
         * === untuk apa?
         * paresInt apa?
         * request.params apa?
         * jika kita meminta data hanya dengan nama request.params 
         * nanti akan muncul semua datanya dan tidak menjadi spesifik 
         * lalu jika ingin spesifik maka diberikanlah id di setelahnya */

//pengambilan data spesifik (end)

//logika response dari server ke client (start)

    if(pasien) {
        /*jika pasien memasukkan nama pasien */

        response.json(pasien);
        /*maka si json akan memberikan database si pasien*/

    } else {
        /*jika di masukkan berbada nama maka*/

        response.status(400).json({
            /*responnya berstatus 400 artinya bad request/permintaan yang buruk
            lalu si json nanti*/

            pesan: "data pasien tidak ditemukan",
            /*akan memberikan pesan data pasien tidak ditemukan*/
        });
    }
});

//logika respon dari server ke client (end)

//cara post perbaikan melalui thunder client? (start)

app.post('/pasiens', (request, response) => {
    /*app akan memposting pasiens dengan request dan response */

    const newpasien = {
        /*penamaan pasiens menjadi newpasien*/

        id: pasiens.length + 1,
        /*dengan id: pasiens.lenght + 1?*/

    ...request.body
    /*dan nanti perbaikannya akan dilakukan di bagian bar body*/
    };

    pasien.push(newpasien);
    /*pasien mengirimkan newpasien ke server dengan perintah push*/

    response.status(200).json(newpasien);
    /*dan diberikan dengan status respon 200 artinya ok ke json(newpasien)*/
});

//cara post perbaikan melalui thunder client? (end)

//cara update berdasarkan id di thunder client? (start)

app.put('/pasiens/:id', (request, response) => {
    /*app menaruh tambahan data ke pasiens menggunakan id nanti ada request dan responnya*/

    const pasien = pasiens.find((data) => 
        /*menamai pasiens dengan pasien dan untuk mencari data dengan parameter data*/

        data.id === parseInt(request.params.id));
        /*dan server nanti meminta memasukkkan data yang spesifik dengan request/perintah id*/

//cara update berdasarkan id di thunder client? (start)

//logika dalam menambahkan/menaruh data lewat thunder client?

    if (pasien) {
        /*jika pasien*/

        pasien.nama,umur,alamat,social_media,nomor_telepon = request.body.nama,umur,alamat,social_media,nomor_telepon;
        /* yang mau ditambahkan di request server melalui body thunder client 
         *boleh berupa nama, umur, alamat, social_media, nomor_telepon*/

        response.json(pasien);
        /*lalu client nanti akan diberikan respon oleh json dari database pasien */

    } else {
        /*jika tidak mendapat respon maka */

        response.status(404).json({
            /*server akan memberikan respon berupa status 404 yang artinya bad request */

            pesan: "pasien tidak ditemukan"
            /*dan isi pesannya berupa "pasien tidak di temukan"*/
        });
    }
});
