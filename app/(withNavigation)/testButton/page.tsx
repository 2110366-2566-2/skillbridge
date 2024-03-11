"use client";
import PrimaryButton from "@/components/buttons/primaryButton/PrimaryButton";
import SecondaryButton from "@/components/buttons/secondaryButton/SecondaryButton";
import GhostButton from "@/components/buttons/ghostButton/GhostButton";
import DangerButton from "@/components/buttons/dangerButton/DangerButton";
import { useState } from "react";

export default function LoggedIn() {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    return (
        <div className="flex gap-3">
            <PrimaryButton
                type="submit"
                isDisabled={disabled}
                onClick={() => setLoading((prevLoading) => !prevLoading)}
                isLoading={loading}
                loadingMessage="loading"
            >
                Primary
            </PrimaryButton>
            <SecondaryButton isDisabled={disabled}>
                Secondary
            </SecondaryButton>
            <GhostButton isDisabled={disabled}>
                Ghost
            </GhostButton>
            <DangerButton isDisabled={disabled}>
                Danger
            </DangerButton>
            <SecondaryButton
                onClick={() => setDisabled((prevDisabled) => !prevDisabled)}
            >
                Toggle
            </SecondaryButton>
        </div>
    );
}
