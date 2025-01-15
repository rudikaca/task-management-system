import { appConfig } from "@/config/app";

export function Logo() {
    return (
        <>
            <img src="/free-lufthansa-282468.webp" alt="Logo" className="h-6 w-6" />
            <span className="font-bold">{appConfig.name}</span>
        </>
    )
}