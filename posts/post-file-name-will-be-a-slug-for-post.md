---
title: "The sample title of the post"
date: "2025-10-28"
readTime: "6 min read"
description: "A sample description of the post"
prevPost:
  title: "Previous Post"
  url: "/posts/previous-post-sample-link.html"
nextPost:
  title: "Next Post"
  url: "/posts/next-post-sample-link.html"
relatedPosts:
  - title: "Sample title of first related post"
    url: "/posts/sample-title-link.html"
  - title: "Sample title of another related post"
    url: "/posts/sample-title-link.html"
---

This is a sample paragraph. This blog post is a sample blog post.

## 1. The Heading

Markdownn is supported, this is a sample post:

- **Stack:** Fast allocation tied to a goroutine frame, automatically cleared upon function return.
- **Heap:** Managed by the [Go Garbage Collector](https://go.dev/doc/gc-guide) when data lives past its scope.

## 2. Compiler Escape Analysis

Consider this standard pattern where `newProfile()` returns a pointer `*Profile`, forcing the allocation to escape the stack:

```go
package main

type Profile struct {
    Username string
    Active   bool
}

func newProfile(name string) *Profile {
    p := Profile{Username: name, Active: true}
    return &p
}

func main() {
    user := newProfile("dev_raj")
    println(user.Username)
}
```

You can inspect compiler decisions by passing `-gcflags="-m"` to the `go build` command.

## 3. Allocation Characteristics

| Factor | Stack Allocation | Heap Allocation |
| :--- | :--- | :--- |
| **Allocation Speed** | Pointer increment (sub-nanosecond) | Allocator search & GC registration |
| **Deallocation Cost** | Zero cost (cleared on return) | GC marking & sweep cycles |

*Comparison of Go memory allocation targets*

## 4. Media Breakdown

<figure>
  <img src="https://via.placeholder.com/680x320?text=Go+Goroutine+Stack+Allocation+Flow" 
       alt="Architectural diagram illustrating how goroutine stack segments allocate and free memory" 
       width="680" 
       height="320" 
       loading="lazy" 
       decoding="async">
  <figcaption>Figure 1: Goroutine stack expansion and contraction lifecycle.</figcaption>
</figure>

<video controls width="680" preload="none">
  <source src="sample-clip.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<audio controls preload="none">
  <source src="summary.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

## 5. Core Takeaways

1. Prioritize idiomatic, maintainable code before fine-tuning memory boundaries.
2. Pass values instead of pointers when data fits comfortably within registers.
3. Use `sync.Pool` to recycle short-lived, high-throughput heap objects.

---

## Related Posts

- [Building Fast APIs with Minimal Dependencies](post.html)
- [Why Simplicity Matters in Software Architecture](post.html)
