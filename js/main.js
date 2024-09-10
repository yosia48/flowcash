// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Menangani formulir tambah bisnis
    const addBusinessForm = document.getElementById('add-business-form');
    if (addBusinessForm) {
        addBusinessForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const businessName = document.getElementById('business-name').value.trim();
            if (businessName) {
                await db.collection('businesses').add({
                    name: businessName,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                addBusinessForm.reset();
                loadBusinesses(); // Refresh daftar bisnis
            }
        });
    }

    // Menangani formulir tambah pemasukan
    const addIncomeForm = document.getElementById('add-income-form');
    if (addIncomeForm) {
        addIncomeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const businessId = document.getElementById('business-select').value;
            const amount = parseFloat(document.getElementById('income-amount').value);
            const category = document.getElementById('income-category').value.trim();
            const description = document.getElementById('income-description').value.trim();

            if (businessId && amount && category) {
                await db.collection('businesses').doc(businessId).collection('transactions').add({
                    amount: amount,
                    category: category,
                    description: description,
                    type: 'income',
                    date: firebase.firestore.FieldValue.serverTimestamp()
                });
                addIncomeForm.reset();
                alert('Pemasukan berhasil ditambahkan!');
            }
        });
    }

    // Menangani formulir tambah pengeluaran
    const addExpenseForm = document.getElementById('add-expense-form');
    if (addExpenseForm) {
        addExpenseForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const businessId = document.getElementById('business-select').value;
            const amount = parseFloat(document.getElementById('expense-amount').value);
            const category = document.getElementById('expense-category').value.trim();
            const description = document.getElementById('expense-description').value.trim();

            if (businessId && amount && category) {
                await db.collection('businesses').doc(businessId).collection('transactions').add({
                    amount: amount,
                    category: category,
                    description: description,
                    type: 'expense',
                    date: firebase.firestore.FieldValue.serverTimestamp()
                });
                addExpenseForm.reset();
                alert('Pengeluaran berhasil ditambahkan!');
            }
        });
    }

    // Menangani laporan keuangan
    const generateReportBtn = document.getElementById('generate-report');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', async () => {
            const businessId = document.getElementById('business-select').value;
            if (businessId) {
                const transactionsSnapshot = await db.collection('businesses').doc(businessId).collection('transactions').get();
                let totalIncome = 0;
                let totalExpense = 0;

                transactionsSnapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.type === 'income') {
                        totalIncome += data.amount;
                    } else if (data.type === 'expense') {
                        totalExpense += data.amount;
                    }
                });

                document.getElementById('total-income').innerText = totalIncome.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
                document.getElementById('total-expense').innerText = totalExpense.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
                document.getElementById('balance').innerText = (totalIncome - totalExpense).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
            } else {
                alert('Pilih bisnis terlebih dahulu!');
            }
        });
    }

    // Fungsi untuk memuat daftar bisnis
    async function loadBusinesses() {
        const businessList = document.getElementById('business-list');
        if (businessList) {
            businessList.innerHTML = '';
            const snapshot = await db.collection('businesses').orderBy('createdAt', 'desc').get();
            snapshot.forEach(doc => {
                const li = document.createElement('li');
                li.textContent = doc.data().name;
                businessList.appendChild(li);
            });
        }

        // Memuat dropdown bisnis di halaman pemasukan, pengeluaran, dan laporan
        const businessSelects = document.querySelectorAll('#business-select');
        businessSelects.forEach(async (select) => {
            select.innerHTML = '<option value="">-- Pilih Bisnis --</option>';
            const snapshot = await db.collection('businesses').orderBy('createdAt', 'desc').get();
            snapshot.forEach(doc => {
                const option = document.createElement('option');
                option.value = doc.id;
                option.textContent = doc.data().name;
                select.appendChild(option);
            });
        });
    }

    loadBusinesses();
});
