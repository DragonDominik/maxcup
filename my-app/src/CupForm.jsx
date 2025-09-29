import React from "react";
import "./App.css";

export default function CupForm({ lang, translations }) {
    const [status, setStatus] = React.useState("idle"); 
    // "idle" | "sending" | "success" | "error"

    const onSubmit = async (event) => {
        event.preventDefault();
        setStatus("sending");
        const form = event.target;
        const formData = new FormData(form);

        const name = formData.get("name");
        const company = formData.get("company");
        const title = company ? `${company} - ${name}` : name;

        formData.set("subject", title);
        formData.set("from_name", name);

        formData.append("access_key", "5ff51d9d-633a-4517-b924-6876c835e007");

        formData.delete("reason");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                form.reset();
                setTimeout(() => setStatus("idle"), 3000); // reset after 3s
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={onSubmit} className="space-y-4">
                <input type="hidden" name="subject" value="Title" />
                <input type="hidden" name="from_name" value="Sender" />

                {/* First row: Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { id: "name", label: translations.contact.name, must: true },
                        { id: "company", label: translations.contact.company, must: false },
                    ].map(({ id, label, must }) => (
                        <div key={id} className="relative w-full">
                            <input
                                type="text"
                                name={id}
                                id={id}
                                maxLength={100}
                                required={must}
                                placeholder=" "
                                className="peer block w-full border-b-2 border-[var(--dark-blue)] bg-transparent pt-2 pb-0.5 sm-text placeholder-transparent focus:border-[var(--dark-blue)] focus:outline-none"
                            />
                            <label
                                htmlFor={id}
                                className="absolute left-0 top-2 text-[var(--dark-blue)] sm-text transition-all duration-300
                                    peer-placeholder-shown:top-2 peer-placeholder-shown:text-[var(--dark-blue)]
                                    peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm
                                    peer-focus:-top-2 peer-focus:sm-text peer-focus:text-[var(--mid-blue)]"
                            >
                                {label} {must && <span className="xs-text">*</span>}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Second row: Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { id: "email", label: translations.contact.email, type: "email", must: true },
                        { id: "phone", label: translations.contact.phone, type: "text", must: true },
                    ].map(({ id, label, type, must }) => (
                        <div key={id} className="relative w-full">
                            <input
                                type={type}
                                name={id}
                                id={id}
                                maxLength={100}
                                required={must}
                                placeholder=" "
                                pattern={id === "phone" ? "^\\+?[0-9\\s\\-()]{7,20}$" : undefined}
                                className="peer block w-full border-b-2 border-[var(--dark-blue)] bg-transparent pt-2 pb-0.5 sm-text placeholder-transparent focus:border-[var(--dark-blue)] focus:outline-none"
                            />
                            <label
                                htmlFor={id}
                                className="absolute left-0 top-2 text-[var(--dark-blue)] sm-text transition-all duration-300
                                    peer-placeholder-shown:top-2 peer-placeholder-shown:text-[var(--dark-blue)]
                                    peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm
                                    peer-focus:-top-2 peer-focus:sm-text peer-focus:text-[var(--mid-blue)]"
                            >
                                {label} <span className="xs-text">*</span>
                            </label>
                        </div>
                    ))}
                </div>

                {/* Message textarea */}
                <div className="relative w-full mt-4">
                    <textarea
                        name="message"
                        id="message"
                        rows={4}
                        required
                        placeholder=" "
                        className="peer block w-full border-b-2 border-[var(--dark-blue)] bg-transparent pt-2 pb-0.5 sm-text placeholder-transparent focus:border-[var(--dark-blue)] focus:outline-none"
                    ></textarea>
                    <label
                        htmlFor="message"
                        className="absolute left-0 top-2 text-[var(--dark-blue)] sm-text transition-all duration-300
                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-[var(--dark-blue)]
                            peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm
                            peer-focus:-top-2 peer-focus:sm-text peer-focus:text-[var(--mid-blue)]"
                    >
                        {translations.contact.message} <span className="xs-text">*</span>
                    </label>
                </div>

                {/* Type select */}
                <div className="relative w-full mt-4">
                    <label htmlFor="type" className="block text-[var(--dark-blue)] mb-1 font-medium">
                        {translations.contact.reason} <span className="xs-text">*</span>
                    </label>
                    <select
                        name="reason"
                        id="reason"
                        defaultValue="rent"
                        className="w-full border-b-2 border-[var(--dark-blue)] pt-2 pb-0.5 sm-text focus:border-[var(--dark-blue)] focus:outline-none bg-transparent"
                    >
                        <option value="sales">{translations.contact.consales}</option>
                        <option value="factory">{translations.contact.confactory}</option>
                        <option value="other">{translations.contact.other}</option>
                    </select>
                </div>

                {/* Button with status */}
                <div className="w-full grid grid-cols-3 items-stretch mt-4">
                    <div className="flex justify-start items-center pr-2">
                        <span className="h-[var(--border-radius-16)] w-full bg-[var(--dark-blue)] rounded-[var(--border-radius-16)] shadow-custom-box"></span>
                    </div>

                    <div className="flex justify-center items-stretch">
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className={`w-full py-2 rounded-[var(--border-radius-16)] transition transform
                                ${
                                    status === "sending"
                                        ? "bg-gray-400 text-white cursor-not-allowedQ"
                                        : status === "success"
                                        ? "bg-[var(--mid-blue)] text-[var(--dark-blue)]"
                                        : status === "error"
                                        ? "bg-red-500 text-[var(--light-blue)]"
                                        : "bg-[var(--dark-blue)] text-[var(--light-blue)] hover:bg-[var(--mid-blue)] hover:text-[var(--dark-blue)] hover:scale-105 active:scale-95"
                                }`}
                        >
                            {status === "idle" && translations.contact.send}
                            {status === "sending" && translations.contact.sending}
                            {status === "success" && translations.contact.sent}
                            {status === "error" && translations.contact.error}
                        </button>
                    </div>

                    <div className="flex justify-start items-center pl-2">
                        <span className="h-[var(--border-radius-16)] w-full bg-[var(--dark-blue)] rounded-[var(--border-radius-16)] shadow-custom-box"></span>
                    </div>
                </div>
            </form>
        </div>
    );
}
