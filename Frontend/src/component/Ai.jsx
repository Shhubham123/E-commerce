import React, { useEffect, useRef, useContext } from 'react'
import ai from '../assets/images1.png'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Ai() {
    let { showSearch, setShowSearch } = useContext(shopDataContext)
    let navigate = useNavigate()
    const recognitionRef = useRef(null)

    function speak(message) {
        let utterance = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterance)
    }

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) {
            console.error("Speech Recognition not supported in this browser")
            return
        }

        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.lang = "en-US"
        recognition.interimResults = false

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript.trim()
            console.log("User said:", transcript)

            let command = transcript.toLowerCase()

            if (command.includes("home")) {
                speak("Opening home page")
                navigate("/")
                setShowSearch(false)
            }
            else if (command.includes("about")) {
                speak("Opening about page")
                navigate("/about")
                setShowSearch(false)
            }
            else if (command.includes("search") && command.includes("open") && !showSearch) {
                speak("Opening search")
                setShowSearch(true)
                navigate("/collection")
            }
            else if (command.includes("search") && command.includes("close") && showSearch) {
                speak("Closing search")
                setShowSearch(false)
            }
            else if (command.includes("collection") || command.includes("collections") || command.includes("product") || command.includes("products")) {
                speak("Opening collection page")
                navigate("/collection")
                setShowSearch(false)
            }
            else if (command.includes("cart") || command.includes("kaat") || command.includes('card')) {
                speak("Opening cart page")
                navigate("/cart")
                setShowSearch(false)
            }
            else if (command.includes("order") || command.includes("myorders") || command.includes("orders")) {
                speak("Opening orders page")
                navigate("/order")
                setShowSearch(false)
            }
            else if (command.includes("logout") || command.includes("log out")) {
                speak("Logging you out")
                // Add your logout logic here

                navigate("/login")
                setShowSearch(false)
            }
            else {
                console.error("Unrecognized command")
                speak("Sorry, I didn't understand that.")
            }

            recognition.stop() // stop after one command
        }

        recognition.onerror = (err) => {
            console.error("Speech recognition error:", err)
            recognition.stop()
        }

        recognitionRef.current = recognition
    }, [navigate, setShowSearch, showSearch])

    const startListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start()
            console.log("Listening...")
        }
    }

    return (
        <div 
            className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] w-[80px] h-[80px] rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-125'
            onClick={startListening}
        >
            <img src={ai} alt="AI" className='w-[80px] h-[80px] rounded-full cursor-pointer' />
        </div>
    )
}

export default Ai
