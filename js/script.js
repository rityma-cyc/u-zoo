document.addEventListener('DOMContentLoaded', function() {

    // --- Logika Umum untuk Semua Halaman ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Halaman Pemesanan Tiket (`tiket.html`) ---
    const bookingForm = document.getElementById('booking-form'); // Menggunakan ID agar lebih spesifik
    if (bookingForm) {
        const adultTicketsInput = document.getElementById('adult-tickets');
        const childTicketsInput = document.getElementById('child-tickets');
        const totalPriceEl = document.getElementById('total-price');

        const ADULT_PRICE = 150000;
        const CHILD_PRICE = 100000;

        function calculateTotal() {
            const adultCount = parseInt(adultTicketsInput.value) || 0;
            const childCount = parseInt(childTicketsInput.value) || 0;
            const total = (adultCount * ADULT_PRICE) + (childCount * CHILD_PRICE);
            totalPriceEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;
        }

        adultTicketsInput.addEventListener('input', calculateTotal);
        childTicketsInput.addEventListener('input', calculateTotal);

        document.getElementById('visit-date').valueAsDate = new Date();
        calculateTotal();

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const bookingData = {
                orderNumber: 'WS' + Date.now(),
                fullName: document.getElementById('full-name').value,
                email: document.getElementById('email').value,
                adults: adultTicketsInput.value,
                children: childTicketsInput.value,
                totalPrice: totalPriceEl.textContent
            };

            localStorage.setItem('bookingData', JSON.stringify(bookingData));
            window.location.href = 'pembayaran.html';
        });
    }

    // --- Halaman Pembayaran (`pembayaran.html`) ---
    const paymentSelection = document.getElementById('payment-selection');
    if (paymentSelection) {
        const paymentMethods = document.querySelectorAll('.payment-method');
        const processingView = document.getElementById('payment-processing');

        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentSelection.classList.add('hidden');
                processingView.classList.remove('hidden');

                setTimeout(() => {
                    window.location.href = 'sukses.html';
                }, 3000);
            });
        });
    }

    // --- Halaman Sukses (`sukses.html`) ---
    const successPage = document.querySelector('.success-page');
    if (successPage) {
        const bookingData = JSON.parse(localStorage.getItem('bookingData'));

        if (bookingData) {
            document.getElementById('order-number').textContent = bookingData.orderNumber;
            document.getElementById('order-name').textContent = bookingData.fullName;
            document.getElementById('order-email').textContent = bookingData.email;
            const totalTickets = parseInt(bookingData.adults) + parseInt(bookingData.children);
            document.getElementById('order-tickets').textContent = `${totalTickets} (${bookingData.adults} Dewasa, ${bookingData.children} Anak)`;

            localStorage.removeItem('bookingData');
        } else {
            document.querySelector('.success-container').innerHTML = '<h1>Transaksi tidak ditemukan.</h1>';
        }
    }

    // --- Logika FAQ (INI BAGIAN YANG DIPERBAIKI) ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Cek apakah item yang diklik sudah aktif
            const isActive = item.classList.contains('active');

            // Tutup semua item lain terlebih dahulu
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Jika item yang diklik tadi belum aktif, maka sekarang aktifkan.
            // Jika sudah aktif, dia akan tetap tertutup karena sudah di-remove di atas.
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

});