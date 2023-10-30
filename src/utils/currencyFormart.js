const CURRENCY_FORMAT = new Intl.NumberFormat('vi-VN', {
    currency: "VND",
    style: "currency"
})

export function formatCurrency(number) {
    return CURRENCY_FORMAT.format(number)
}