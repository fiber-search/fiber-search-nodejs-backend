class Time {
    constructor() {
        this.date = new Date();
    }
    date;
    accurateToDate() {
        const y = this.date.getUTCFullYear();
        const m = this.date.getUTCMonth() + 1;
        const d = this.date.getUTCDate();
        return `${y}-${m}-${d}`;
    }
}

module.exports = Time
