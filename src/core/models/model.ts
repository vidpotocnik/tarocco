export class Model {

    /**
     * Date when we created this object.
     * It is needed to decide if cached object is stil
     * relevant or not.
     */
    protected createdAt: Date = null;

    /**
     * How many seconds an object in cache is valid. If
     * it is older then this number of seconds, we don't
     * return it.
     */
    protected validSeconds = 120;


    constructor(data: any) {

        for (const propName in data) {
            if (data.hasOwnProperty(propName)) {
                this[propName] = data[propName];
            }
        }

        this.createdAt = new Date();
    }

    /**
     * Returns true if current object has been cached
     * more then this.validSeconds ago and is not relevant
     * any more.
     */
    hasExpired() {
        const diff = ((new Date()).getTime() - this.createdAt.getTime()) / 1000;
        return diff > this.validSeconds;
    }

    /**
     * Maps all items to real objects.
     */
    mapToObjects(key: string, className: any): void {
        if (!this[key]) {
            return;
        }

        this[key] = this[key].filter(item => item).map(item => new className(item));
    }
}
