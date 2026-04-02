import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Shield, BarChart3 } from "lucide-react";

export default function LoginPage() {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  // Sign In state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInError, setSignInError] = useState("");

  // Sign Up state
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim() || !signInPassword.trim()) {
      setSignInError("Please fill in all fields");
      return;
    }
    const err = login(signInEmail.trim(), signInPassword);
    if (err) setSignInError(err);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName.trim() || !signUpEmail.trim() || !signUpPassword.trim()) {
      setSignUpError("Please fill in all fields");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpEmail)) {
      setSignUpError("Please enter a valid email");
      return;
    }
    if (signUpPassword.length < 6) {
      setSignUpError("Password must be at least 6 characters");
      return;
    }
    const err = signup(signUpName.trim(), signUpEmail.trim(), signUpPassword);
    if (err) setSignUpError(err);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center bg-primary/5 px-12">
        <div className="max-w-md space-y-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <DollarSign className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">FinanceFlow</h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Take control of your finances with powerful insights, real-time tracking, and beautiful visualizations.
          </p>
          <div className="space-y-4">
            {[
              { icon: BarChart3, title: "Smart Analytics", desc: "Visualize spending patterns with interactive charts" },
              { icon: TrendingUp, title: "Track Trends", desc: "Monitor income and expenses over time" },
              { icon: Shield, title: "Role-Based Access", desc: "Admin and viewer roles for team collaboration" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 animate-slide-up"
                style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}
              >
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex flex-1 items-center justify-center px-4">
        <Card className="w-full max-w-md animate-scale-in border-border shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="lg:hidden mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <DollarSign className="h-7 w-7" />
            </div>
            <CardTitle className="text-2xl">
              {tab === "signin" ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {tab === "signin"
                ? "Sign in to access your dashboard"
                : "Get started with FinanceFlow today"}
            </p>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="si-email">Email</Label>
                    <Input
                      id="si-email"
                      type="email"
                      value={signInEmail}
                      onChange={(e) => { setSignInEmail(e.target.value); setSignInError(""); }}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="si-password">Password</Label>
                    <Input
                      id="si-password"
                      type="password"
                      value={signInPassword}
                      onChange={(e) => { setSignInPassword(e.target.value); setSignInError(""); }}
                      placeholder="••••••••"
                    />
                  </div>
                  {signInError && <p className="text-sm text-destructive animate-fade-in">{signInError}</p>}
                  <Button type="submit" className="w-full">Sign In</Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="su-name">Full Name</Label>
                    <Input
                      id="su-name"
                      value={signUpName}
                      onChange={(e) => { setSignUpName(e.target.value); setSignUpError(""); }}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="su-email">Email</Label>
                    <Input
                      id="su-email"
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => { setSignUpEmail(e.target.value); setSignUpError(""); }}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="su-password">Password</Label>
                    <Input
                      id="su-password"
                      type="password"
                      value={signUpPassword}
                      onChange={(e) => { setSignUpPassword(e.target.value); setSignUpError(""); }}
                      placeholder="Min. 6 characters"
                    />
                  </div>
                  {signUpError && <p className="text-sm text-destructive animate-fade-in">{signUpError}</p>}
                  <Button type="submit" className="w-full">Create Account</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
