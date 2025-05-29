import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { uploadProfilePhoto } from "@/services/userService";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileAvatar({ user, onUpdate }) {
    const [preview, setPreview] = useState(user.profile_photo || null);
    const fileInputRef = useRef(null);
    const { accessToken } = useAuth();

    console.log('URL da Imagem de Perfil:', user.profile_photo);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profile_photo', file);

        try {
            const updatedUser = await uploadProfilePhoto(formData, accessToken);
            setPreview(updatedUser.profile_photo);
            console.log(updatedUser.profile_photo)
            onUpdate(updatedUser);
        } catch (error) {
            console.error('Erro ao atualizar foto de perfil:', error);
        }
    };

    return (
        <div className="relative group w-24 h-24">
            <Avatar className='w-full h-full'>
                <AvatarImage src={preview} alt={user.first_name} />
                <AvatarFallback>{user.first_name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div 
                className='absolute inset-0 bg-gray-100 dark:bg-gray-900 bg-opacity-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full'
                onClick={() => fileInputRef.current.click()}
            >
                <Pencil2Icon className="text-gray-900 dark:text-white w-6 h-6"/>
            </div>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </div>
    );
}