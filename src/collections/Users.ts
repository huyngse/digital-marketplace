import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
    slug: "users",
    auth: true,
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