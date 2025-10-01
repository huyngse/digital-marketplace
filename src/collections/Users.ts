import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
    slug: "users",
    auth: true,
    access: {
        read: () => true
    },
    fields: [
        {
            name: "role",
            type: "select",
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