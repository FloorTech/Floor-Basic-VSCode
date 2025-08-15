import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {
    const commands: vscode.CompletionItem[] = [
        { label: "SETVALUE", kind: vscode.CompletionItemKind.Keyword, detail: "Sets stored value", sortText: "", },
        { label: "PX", kind: vscode.CompletionItemKind.Keyword, detail: "Draw pixel from stored color", sortText: "", },
        { label: "PRINT", kind: vscode.CompletionItemKind.Keyword, detail: "Print stored value", sortText: "", },
        { label: "GOTO", kind: vscode.CompletionItemKind.Keyword, detail: "Jump to line", sortText: "", },
        { label: "INPUT", kind: vscode.CompletionItemKind.Keyword, detail: "Input into stored value", sortText: "", },
        { label: "APPEND_VALUE", kind: vscode.CompletionItemKind.Keyword, detail: "Append to stored value", sortText: "", },
        { label: "CLEAR_VALUE", kind: vscode.CompletionItemKind.Keyword, detail: "Clear stored value", sortText: "", },
        { label: "ADD", kind: vscode.CompletionItemKind.Keyword, detail: "Add to stored value as number", sortText: "", },
        { label: "SUB", kind: vscode.CompletionItemKind.Keyword, detail: "Subtract from stored value as number", sortText: "", },
        { label: "NL", kind: vscode.CompletionItemKind.Keyword, detail: "Insert newline", sortText: "", },
        { label: "CLS", kind: vscode.CompletionItemKind.Keyword, detail: "Clear console", sortText: "", },
        { label: "WAIT", kind: vscode.CompletionItemKind.Keyword, detail: "Wait (ms from stored value)", sortText: "", },
    ].map((item, i) => {
        item.sortText = i.toString().padStart(3, "0")
        return item
    })

    const colors: vscode.CompletionItem[] = [
        "newline", "clear", "red", "orange", "yellow", "green",
        "blue", "purple", "brown", "black", "pink", "bricks"
    ].map((c, i) => {
        const item = new vscode.CompletionItem(c, vscode.CompletionItemKind.Color)
        item.detail = "Color constant"
        item.sortText = (i + 100).toString().padStart(3, "0")
        return item
    })

    const provider: vscode.CompletionItemProvider = {
        provideCompletionItems(
            document: vscode.TextDocument,
            position: vscode.Position
        ): vscode.CompletionItem[] {
            const line: string = document.lineAt(position).text.trim()
            const words: string[] = line.split(/\s+/)

            if (words[0] === "SETVALUE") {
                const setValueItems: vscode.CompletionItem[] = []

                // Text value
                const textItem = new vscode.CompletionItem("Some text...", vscode.CompletionItemKind.Text)
                textItem.detail = "A text value"
                textItem.sortText = "001"
                setValueItems.push(textItem)

                // Divider
                const divider1 = new vscode.CompletionItem("---", vscode.CompletionItemKind.Text)
                divider1.detail = "Dividing line"
                divider1.sortText = "002"
                setValueItems.push(divider1)

                // Numbers 1-9 + "etc"
                const numbersAndEtc: string[] = [...Array(9)].map((_, i) => (i + 1).toString()).concat(["etc"])

                numbersAndEtc.forEach((val, idx) => {
                    const numItem = new vscode.CompletionItem(val, vscode.CompletionItemKind.Value)
                    numItem.detail = "Number value"
                    numItem.sortText = (3 + idx).toString().padStart(3, "0")
                    setValueItems.push(numItem)
                })


                // Divider
                const divider2 = new vscode.CompletionItem("---", vscode.CompletionItemKind.Text)
                divider2.detail = "Dividing line"
                divider2.sortText = "020"
                setValueItems.push(divider2)

                setValueItems.push(...colors)
                return setValueItems
            }

            if (line.length === 0 || /^[A-Z_]+$/.test(words[0])) {
                return commands
            }

            return colors
        }
    }

    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider("floorbasic", provider, " ")
    )
}

export function deactivate(): void { }
