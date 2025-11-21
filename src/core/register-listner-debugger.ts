export class RegisterListnerDebugger {
    registry: Record<string, { data: string; ts: Date; } | undefined> = {};
    register(key: string, value: string) {
        this.registry[key] = {
            data: value,
            ts: new Date()
        };
    }
    get(key: string) {
        const meta = this.registry?.[key];
        if (!meta)
            throw new Error('key not registerd.');
        return meta;
    }
}
