"use client"
import { useChat, Message } from "ai/react"
import Link from "next/link";
import Image from "next/image";
import LOGO from "../../public/Logo.png"

export default function ChatComponent() {
    // Vercel AI SDK (ai package) useChat()
    // useChat -> handles messages for us, user input, handling user submits, etc.
    const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();
    // messages -> [user asks a question, gpt-4 response, user asks again, gpt-4 responds]

    console.log(messages);
    console.log(input);

    return (
        <div>
        <div className=" pt-[20px] flex justify-center">
        <Link href="/" passHref>
            <Image
                src={LOGO}
                alt="Logo" // Remember to provide an alt attribute for accessibility
                width={100}
                height={100} // Specify the height to match the width or as needed
                style={{ cursor: 'pointer' }} // Optional: Change cursor to pointer on hover
            />
        </Link>
        </div>
            {messages.map((message : Message) => {
                return (
                    <div key={message.id}>
                        {/*  Name of person talking */}
                        {
                            message.role === "assistant"
                            ?
                            <h3 className="text-lg font-semibold mt-2">
                                GPT-4
                            </h3>
                            :
                            <h3 className="text-lg font-semibold mt-2">
                                User
                            </h3>
                        }
                        
                        {/* Formatting the message */}
                        {message.content.split("\n").map((currentTextBlock: string, index : number) => {
                            if(currentTextBlock === "") {
                                return <p key={message.id + index}>&nbsp;</p> // " "
                            } else {
                                return <p key={message.id + index}>{currentTextBlock}</p> // "Cooper Codes is a YouTuber"
                            }
                        })}


                        {/*  
                            Cooper Codes is a YouTuber

                            He makes software content

                            You should subscribe.

                            ["Cooper Codes is a YouTuber", "", "He makes software content", "", "You should subscribe."]

                        */}
                    </div>
                )
            })}

            <form className="mt-12" onSubmit={handleSubmit}>
                <p className="pl-[30px]">User Message</p>
                <div className="pl-[30px]">

                <textarea
                    className="mt-2 w-[90%] bg-white p-2 our-font"
                    value={input}
                    onChange={handleInputChange}
                    />
                    </div>
                <div className="flex justify-center">

                <button className="rounded-md bg-white p-2 mt-2 text-[#0199a1] our-font">
                    Send message
                </button>
                </div>
            </form>
        </div>
    )
}