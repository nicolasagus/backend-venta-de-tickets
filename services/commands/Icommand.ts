// src/main/services/commands/ICommand.ts

export interface ICommand {
    ejecutar(): Promise<boolean>;
    deshacer(): Promise<boolean>; // El toque de calidad para la facultad
}