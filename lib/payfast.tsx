import crypto from "crypto"

interface PayFastData {
  merchant_id: string
  merchant_key: string
  return_url: string
  cancel_url: string
  notify_url: string
  name_first: string
  email_address: string
  amount: string
  item_name: string
  item_description?: string
  subscription_type?: "1" // 1 for subscription
  billing_date?: string
  recurring_amount?: string
  frequency?: "3" // 3 for monthly
  cycles?: "0" // 0 for indefinite
}

export function generatePayFastSignature(data: PayFastData, passphrase?: string): string {
  // Create parameter string
  let pfOutput = ""
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      pfOutput += `${key}=${encodeURIComponent(data[key as keyof PayFastData] || "").trim()}&`
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1)

  if (passphrase) {
    getString += `&passphrase=${encodeURIComponent(passphrase.trim())}`
  }

  return crypto.createHash("md5").update(getString).digest("hex")
}

export function createPayFastForm(data: PayFastData & { signature: string }): string {
  const isSandbox = process.env.PAYFAST_MODE === "sandbox"
  const url = isSandbox ? "https://sandbox.payfast.co.za/eng/process" : "https://www.payfast.co.za/eng/process"

  let form = `<form id="payfast-form" action="${url}" method="POST">`

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      form += `<input type="hidden" name="${key}" value="${data[key as keyof typeof data]}" />`
    }
  }

  form += "</form>"
  form += '<script>document.getElementById("payfast-form").submit();</script>'

  return form
}
