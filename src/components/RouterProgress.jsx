'use client'

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import nProgress from "nprogress"
import 'nprogress/nprogress.css'

nProgress.configure({ showSpinner: false, trickleSpeed: 200 })

export default function RouterProgress() {
    const pathname = usePathname()

    useEffect(() => {
        nProgress.start()
        nProgress.done()
    }, [pathname])

    return null
}
