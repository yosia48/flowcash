// js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form'); // Formulir pendaftaran

    // Pendaftaran pengguna baru
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;

            try {
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Simpan data pengguna ke Firestore
                await db.collection('users').doc(user.uid).set({
                    email: user.email,
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                });

                alert('Pendaftaran berhasil! Silakan login.');
            } catch (error) {
                alert('Pendaftaran gagal: ' + error.message);
            }
        });
    }

    // Login pengguna
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
                window.location.href = 'report.html'; // Arahkan ke halaman laporan setelah login
            } catch (error) {
                alert('Login gagal: ' + error.message);
            }
        });
    }
});