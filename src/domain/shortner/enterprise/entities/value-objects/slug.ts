export class Slug {
    private value: string

    private constructor(value: string) {
        this.value = value
    }

    public toValue() {
        return this.value
    }

    static create(value: string) {
        return new Slug(value)
    }

    static createFromText(text: string): Slug {
        const slugText = text
          .normalize('NFKD')
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/_/g, '-')
          .replace(/--+/g, '-')
          .replace(/-$/g, '')
    
        return new Slug(slugText)
    }
}