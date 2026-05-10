const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const submitButton = chatForm.querySelector('button[type="submit"]');

// Menyimpan riwayat percakapan untuk dikirim ke API
let conversation = [];
const MAX_HISTORY = 10; // Best Practice: Batas maksimal pesan dalam memory

/**
 * Fungsi pembantu untuk menambahkan elemen pesan ke dalam chat box
 */
function appendMessage(role, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role);
    
    // Menggunakan textContent agar aman dari XSS
    messageDiv.textContent = text;
    
    chatBox.appendChild(messageDiv);
    
    // Otomatis scroll ke bagian paling bawah
    chatBox.scrollTop = chatBox.scrollHeight;
    
    return messageDiv;
}

// Fungsi untuk toggle form (disable saat load)
function setFormState(isDisabled) {
    userInput.disabled = isDisabled;
    submitButton.disabled = isDisabled;
    if (!isDisabled) {
        userInput.focus();
    }
}

chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const text = userInput.value.trim();
    if (!text) return;

    // 1. Tambahkan pesan pengguna ke UI
    appendMessage('user', text);
    
    // 2. Tambahkan ke array riwayat percakapan
    conversation.push({ role: 'user', text });
    
    // Batasi riwayat agar tidak terlalu panjang (Best Practice)
    if (conversation.length > MAX_HISTORY) {
        conversation = conversation.slice(conversation.length - MAX_HISTORY);
    }
    
    // 3. Kosongkan input field dan matikan input
    userInput.value = '';
    setFormState(true);
    
    // 4. Tampilkan pesan bot sementara "Thinking..."
    const thinkingMessage = appendMessage('model', 'Thinking...');
    
    try {
        // 5. Kirim permintaan POST ke endpoint /api/chat
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ conversation })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Gagal mengambil respon dari server');
        }

        // 6. Saat respon tiba, ganti teks "Thinking..." dengan jawaban asli
        if (data && data.result) {
            thinkingMessage.textContent = data.result;
            
            // Tambahkan respon model ke riwayat
            conversation.push({ role: 'model', text: data.result });
            
            if (conversation.length > MAX_HISTORY) {
                conversation = conversation.slice(conversation.length - MAX_HISTORY);
            }
        } else {
            thinkingMessage.textContent = 'Sorry, no response received.';
        }
    } catch (error) {
        console.error('Chat error:', error);
        // 7. Penanganan error
        thinkingMessage.textContent = error.message || 'Failed to get response from server.';
    } finally {
        // Nyalakan kembali form setelah selesai (Best Practice UX)
        setFormState(false);
    }
});
