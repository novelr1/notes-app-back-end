const { nanoid } = require('nanoid');
const notes = require('./notes.js');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNote);

  //menentukan apakah newNote sudah masuk ke dalam array notes?
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  //Jika isSuccess bernilai true, maka beri response berhasil. Jika false, maka beri response gagal.
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal untuk ditambahkan',
  });
  response.code(500);
  return response;
};

// Anda juga tidak perlu menuliskan parameter request dan h karena ia tidak digunakan
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

//objek catatan secara spesifik berdasarkan id yang digunakan oleh path parameter
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  //dapatkan objek note dengan id tersebut dari objek array notes. Manfaatkan method array filter()
  const note = notes.filter((n) => n.id===id)[0];

  /*kembalikan fungsi handler dengan data beserta objek note di dalamnya. Objek note tidak boleh bernilai undefined.
  jika sukses tidak perlu respon code dan h.response dikarenakan hanya untuk menampilkan data note saja
  */
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  //kita dapatkan data notes terbaru yang dikirimkan oleh client melalui body request
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  //saatnya mengubah catatan lama dengan data terbaru. Manfaatkan indexing array
  //Pertama, dapatkan dulu index array pada objek catatan sesuai id
  const index = notes.findIndex((note) => note.id===id);

  //Bila note dengan id yang dicari ditemukan, maka index akan bernilai array index dari objek catatan yang dicari
  //Namun bila tidak ditemukan, maka index bernilai -1. Gunakan fungsi if-else
  if (index !== -1) {
    notes[index]= {
      //Menumpuk cacatan yg lama
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Cacatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  //Pertama, dapatkan dulu index array pada objek catatan sesuai id
  const index = notes.findIndex((note) => note.id===id);

  //Bila note dengan id yang dicari ditemukan, maka index akan bernilai array index dari objek catatan yang dicari
  //Namun bila tidak ditemukan, maka index bernilai -1. Gunakan fungsi if-else
  if (index !== -1) {

    //untuk menghapus data pada array berdasarkan index, gunakan method array splice().
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Cacatan berhasil dihapus',
    });

    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
};