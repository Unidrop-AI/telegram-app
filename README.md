# Telegram mini app 

### Hướng dẫn chạy

1. Copy file .env.dev sang .env

2. Tạo database postgres như biến DATABASE_URL trong file .env

3. Tạo file .npmrc (để ở thư mục home của người dùng) để có thể cài đặt các module từ @roxavn 

```
//npm.pkg.github.com/:_authToken=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
@roxavn:registry=https://npm.pkg.github.com
```

4. Cài đặt các thư viện 

```
npm ic
```

5. Đồng bộ các module của roxavn

```
npx roxavn sync
// run database migration
npx roxavn migration:up
// tạo user admin và các role
npx roxavn hook
```

6. Khởi động server dev

```
npm run dev
```

### Giới thiệu hệ thống

1. Hệ thống gồm tool admin truy cập qua [đường dẫn](http://localhost:5173/login?ref=%2Fadmin%2Fapps). Tài khoản `admin`, mật khẩu `admin` 

2. Hệ thống gồm web cho telegram miniapp truy cập qua http://localhost:5173. Vì bình thường miniapp sẽ chỉ vào được nếu click link qua telegram miniapp (do yêu cầu đăng nhập telegram). Nên muốn vào được http://localhost:5173, phải login qua link này trước http://localhost:5173/login
