package main

type Event interface {
	Do() error
}

type ExceptionEvent struct {
	Message string
}

type SignaturesFoundEvent struct {
	Message string
}
