import {object, string, number, TypeOf} from 'zod';

export const registerUserSchema = {
    body: object({
        username: string({
            required_error: "Username is required"
        }), 
        email: string({
            required_error: "Email is required"
        }).email("Not a valid Email"), 
        password: string({
            required_error: "Password is required"
        }).min(6, "Password must be atleast 6 characters long").max(64, "Password should not be longer than 64 characters"), 
        confirmPassword: string({
            required_error: "ConfirmPassword is required"
        }),
        role: number({
            required_error: "User role is required"
        })
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match", 
        path: ["confirmPassword"]
    })
};

export const editUserSchema = object({
    params: object({
        id: string()
    }), 
    body: object({
        username: string({
            required_error: "Username is required"
        }), 
        email: string({
            required_error: "Email is required"
        }).email("Not a valid Email"), 
        password: string({
            required_error: "Password is required"
        }).min(6, "Password must be atleast 6 characters long").max(64, "Password should not be longer than 64 characters"),
        role: number({
            required_error: "User role is required"
        })
    })
});


export const deleteUserSchema = object({
    params: object({
        id: string()
    })
});


export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
export type EditUserBody = TypeOf<typeof editUserSchema>;
export type DeleteUserBody = TypeOf<typeof deleteUserSchema>["params"];
