# Rizz It Up - Telegram Bot

Rizz It Up là một bot Telegram giúp người dùng tạo ra các bio hẹn hò, câu trả lời thú vị (rizz), và các câu tán tỉnh (pickup lines) cho các ứng dụng hẹn hò. Bot sử dụng OpenAI để tạo nội dung dựa trên các yêu cầu của người dùng.

## Tính năng

- **Tạo Bio Hẹn Hò**: Bot giúp bạn tạo một bio hấp dẫn và phù hợp với các nền tảng hẹn hò như Tinder, Bumble, và OkCupid.
- **Tạo Rizz**: Bot cung cấp các câu trả lời thông minh và hài hước cho các tình huống trong các cuộc trò chuyện hẹn hò.
- **Tạo Pickup Line**: Bot tạo các câu tán tỉnh cá nhân hóa dựa trên thông tin mà người dùng cung cấp.
- **Tương tác với người dùng**: Người dùng có thể trả lời các câu hỏi theo từng bước và bot sẽ xử lý yêu cầu một cách mượt mà.

## Yêu Cầu

Để chạy bot này, bạn cần có:

- Node.js (với phiên bản >= 14)
- Thư viện `dotenv`, `telegraf`, và `openai` đã được cài đặt
- Một tài khoản OpenAI và Telegram Bot Token

## Cài Đặt

1. **Cài đặt Node.js**: Nếu chưa cài đặt Node.js, bạn có thể tải về và cài đặt từ [https://nodejs.org/](https://nodejs.org/).

2. **Cài đặt các thư viện cần thiết**:

    Sau khi đã cài đặt Node.js, bạn cần cài đặt các thư viện phụ thuộc bằng lệnh sau:
    ```bash
    npm install dotenv telegraf openai
    ```

3. **Tạo tệp `.env`**:

    Tạo một tệp `.env` trong thư mục gốc của dự án và thêm các biến môi trường sau:

    ```env
    TELEGRAM_BOT_TOKEN=your-telegram-bot-token
    OPENAI_API_KEY=your-openai-api-key
    ```

    Thay `your-telegram-bot-token` và `your-openai-api-key` bằng các thông tin thực tế của bạn.

4. **Chạy Bot**:

    Sau khi hoàn tất cài đặt, bạn có thể chạy bot bằng lệnh sau:
    ```bash
    node bot.js
    ```

## Cách sử dụng

1. **Khởi động bot**: Gửi lệnh `/start` để bắt đầu sử dụng bot. Bot sẽ hiển thị menu chính với các lựa chọn:
   - **Tạo Bio**: Tạo bio cho ứng dụng hẹn hò.
   - **Tạo Rizz**: Tạo câu trả lời hài hước cho một tình huống trong cuộc trò chuyện.
   - **Tạo Pickup Line**: Tạo câu tán tỉnh cá nhân hóa.

2. **Tạo Bio**: Khi chọn "Tạo Bio", bot sẽ hỏi bạn về nền tảng bạn đang sử dụng (Tinder, Bumble, OkCupid, etc.) và các thông tin như tính cách, sở thích, kiểu quan hệ bạn tìm kiếm.

3. **Tạo Rizz**: Khi chọn "Tạo Rizz", bot sẽ yêu cầu bạn nhập một tình huống hoặc câu bạn muốn trả lời, và nó sẽ tạo ra một câu trả lời hài hước.

4. **Tạo Pickup Line**: Chọn "Tạo Pickup Line", bot sẽ yêu cầu bạn cung cấp một số thông tin về người mà bạn muốn gửi câu tán tỉnh, và nó sẽ tạo ra một câu tán tỉnh phù hợp.

## Cấu trúc Dự án
/project-root
├── index.js # Mã nguồn chính của bot
├── .env # Các biến môi trường (Telegram Bot Token, OpenAI API Key)
├── package.json # Thông tin dự án và các gói phụ thuộc
├── README.md # Tài liệu hướng dẫn sử dụng dự án

## Các Tính Năng Đang Phát Triển

- **Tùy chọn tone cho Bio**: Cung cấp các lựa chọn cho tone của bio (Hài hước, Thân thiện, Lãng mạn, etc.).
- **Lưu trữ dữ liệu người dùng**: Lưu trữ các câu trả lời, pickup lines, và bio của người dùng vào cơ sở dữ liệu để tham khảo lại.

## Tham Gia Dự Án

Nếu bạn muốn đóng góp vào dự án, vui lòng tạo một pull request hoặc mở issue để thảo luận.

## Giấy phép

Dự án này được phát hành theo giấy phép MIT.

---

Cảm ơn bạn đã sử dụng **Rizz It Up**! 🎉
