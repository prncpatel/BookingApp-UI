import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <div className="text-center space-y-6">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>
                <Button 
                    onClick={() => navigate("/")}
                    className="mt-4"
                >
                    Return to Dashboard
                </Button>
            </div>
        </div>
    );
};    