import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: ({token}) => {
                return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify Your Email</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #fff1f2; /* light rose */
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        margin: 40px auto;
        padding: 20px;
        background-color: #fff1f2; /* soft rose */
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        text-align: center;
    }
    h1 {
        color: #f43f5e; /* deeper rose */
    }
    p {
        color: #333;
        font-size: 16px;
    }
    a.button {
        display: inline-block;
        padding: 12px 24px;
        margin-top: 20px;
        background-color: #f43f5e; /* bright rose */
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
    }
    a.button:hover {
        background-color: #f43f5e; /* darker rose */
    }
</style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Our Site!</h1>
        <p>Thank you for signing up! Please verify your email by clicking the button below:</p>
        <a class="button" href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Verify Email</a>
        <p>If you didn't sign up for this account, please ignore this email.</p>
        <p>💖 With love, <br/> The Team</p>
    </div>
</body>
</html>
                `
            }
        }
    },
    access: {
        read: () => true,
        create: () => true,
    },
    fields: [
        {
            name: "role",
            type: "select",
            defaultValue: "user",
            required: true,
        
            options: [{
                label: "Admin",
                value: "admin"
            }, {
                label: "User",
                value: "user"
            }]
        }
    ]
}