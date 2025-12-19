// untuk menampilkan waktu otomatis
const timeElement = document.getElementById("time");
// mapping hari
const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
// mapping bulan
const bulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
// ambil tanggal sekarang
const now = new Date();

const namaHari = hari[now.getDay()];
const tanggal = now.getDate();
const namaBulan = bulan[now.getMonth()];
const tahun = now.getFullYear();

// tampilkan ke html
timeElement.textContent = `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;
const createdDate = new Date().toISOString().split("T")[0];

// function text empty
function updateEmptyState() {
  const todoEmpty = document.getElementById("todo-empty");
  const doneEmpty = document.getElementById("done-empty");

  // To Do
  todoEmpty.style.display =
    todoContainer.children.length > 1 ? "none" : "block";

  // Done
  doneEmpty.style.display =
    doneContainer.children.length > 1 ? "none" : "block";
}
// mengambil elemet pada html
const todoInput = document.getElementById("todo-input");
const prioritySelect = document.getElementById("priority");
const submitBtn = document.getElementById("submit-btn");
const todoContainer = document.getElementById("todo-container");
const doneContainer = document.getElementById("done-container");
const deleteAllBtn = document.getElementById("delete-all");

// logic overdue
function checkOverdue(todoItem) {
  const today = new Date().toISOString().split("T")[0];
  const taskDate = todoItem.dataset.date;

  if (taskDate < today) {
    todoItem.classList.add("overdue");
    const label = todoItem.querySelector(".overdue-label");
    if (label) label.style.display = "inline-block";
  }
}

// event submit
submitBtn.addEventListener("click", function () {
  const todoText = todoInput.value.trim();
  const priority = prioritySelect.value;

  // validasi
  if (todoText === "" || priority === "") {
    alert("Isi tugas dan prioritas terlebih dahulu !!");
    return;
  }

  // buat test overdue
  // const yesterday = new Date();
  // yesterday.setDate(yesterday.getDate() - 1);

  // const tanggalText = `${hari[yesterday.getDay()]}, ${yesterday.getDate()} ${
  //   bulan[yesterday.getMonth()]
  // } ${yesterday.getFullYear()}`;

  // const createdDate = yesterday.toISOString().split("T")[0];
  const now = new Date();

  const tanggalText = `${hari[now.getDay()]}, ${now.getDate()} ${
    bulan[now.getMonth()]
  } ${now.getFullYear()}`;

  const createdDate = now.toISOString().split("T")[0];

  // Buat elemen todo
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  todoItem.dataset.date = createdDate;

  todoItem.innerHTML = `
        <input type="checkbox">
        <div class="todo-content">
            <strong>${todoText}</strong><br>
            <small>Prioritas: ${priority}</small><br>
            <small>${tanggalText}</small><br>
            <span class="overdue-label" style="display:none;">OVERDUE</span><br>
        </div>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    `;

  // ambbil checkbox atau btn todo list
  const checkbox = todoItem.querySelector("input[type='checkbox']");
  const deleteBtn = todoItem.querySelector(".delete-btn");

  // delete satu todo list
  deleteBtn.addEventListener("click", function () {
    todoItem.remove();
    updateEmptyState();
  });

  // event checkbox
  checkbox.addEventListener("change", function () {
    // add label overdue
    todoItem.classList.remove("overdue");
    const label = todoItem.querySelector(".overdue-label");
    if (label) label.remove();

    // Hapus checkbox & delete button
    todoItem.querySelector("input").remove();
    todoItem.querySelector(".delete-btn").remove();

    // Ganti class jadi done
    todoItem.classList.remove("todo-item");
    todoItem.classList.add("done-item");

    // Pindahkan ke DONE
    doneContainer.appendChild(todoItem);
    updateEmptyState();
  });
  // Masukkan ke list
  todoContainer.appendChild(todoItem);
  checkOverdue(todoItem);
  updateEmptyState();

  // Reset input
  todoInput.value = "";
  prioritySelect.value = "";
});

// delete all
deleteAllBtn.addEventListener("click", function () {
  const isConfirm = confirm("Yakin ingin menghapus semua task?");
  if (!isConfirm) return;

  document.querySelectorAll(".todo-item").forEach((item) => item.remove());
  document.querySelectorAll(".done-item").forEach((item) => item.remove());
  updateEmptyState();
});
