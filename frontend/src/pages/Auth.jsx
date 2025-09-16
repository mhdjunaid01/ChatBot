import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
const AuthPage = () => {
 const { signInData,registerData,setSignInData,setRegisterData,handleLogin, handleRegister  } =useContext(AuthContext);


const handleSignUp=(e)=>{
  setRegisterData({ ...registerData, [ e.target.id]: e.target.value }) 
}

const handleLoginData=(e)=>{
  setSignInData({ ...signInData, [ e.target.id]: e.target.value }) 
}




    return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs defaultValue="signIn" className="w-full max-w-sm">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signIn">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signIn">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Sign In to your account</CardTitle>
                <CardDescription>
                  Enter your email below to Sign In to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={signInData.email}
                        onChange={handleLoginData }
                       
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={signInData.password}
                        onChange={ handleLoginData}
                       
                      />
                    </div>
                  </div>
                  <CardFooter className="flex-col gap-2 mt-6">
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Register your account</CardTitle>
                <CardDescription>
                  Enter Your Name, Email, And Password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="userName">User Name</Label>
                      <Input
                        id="userName"
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={registerData.userName}
                        onChange={ handleSignUp }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value ={registerData.email}
                        onChange={handleSignUp}
                       
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={registerData.password}
                        onChange={handleSignUp}
                      />
                    </div>
                  </div>
                  <CardFooter className="flex-col gap-2 mt-6">
                    <Button type="submit" className="w-full">
                      Register
                    </Button>
                   
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;